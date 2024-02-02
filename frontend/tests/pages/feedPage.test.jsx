import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import '@testing-library/jest-dom'
import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getPosts } from "../../src/services/posts";
import { useNavigate } from "react-router-dom";

// Mocking the getPosts service
vi.mock("../../src/services/posts", () => {
	const getPostsMock = vi.fn();
	return { getPosts: getPostsMock };
});

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", async () => {
	const actual = await vi.importActual('react-router-dom')
	const MockLink = ({to, children}) => <a href={to}>{children}</a>
	const navigateMock = vi.fn();
	const useNavigateMock = () => navigateMock;
	return {
		...actual,
		Link:MockLink,
		useNavigate: useNavigateMock
	}
});


describe("Feed Page", () => {
	beforeEach(() => {
		window.localStorage.removeItem("token");
	});

	test("It displays posts from the backend", async () => {
		window.localStorage.setItem("token", "testToken");

		const mockPosts = [{ _id: "12345", message: "Test Post 1", username: "test_user1" }];

		getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });

		render(<FeedPage />);

		const post = await screen.findByText(/test post 1/i);
		expect(post).toBeInTheDocument();

	});

	test("It displays posts in reverse chronologicle order", async () => {
		window.localStorage.setItem("token", "testToken");

		const mockPosts = [
			{
				_id: "11111",
				message: "Test Post Old",
				createdAt: "2022-01-30T15:39:22.550Z",
			},
			{
				_id: "22222",
				message: "Test Post New",
				createdAt: "2024-01-30T15:39:22.550Z",
			},
			{
				_id: "33333",
				message: "Test Post Middle",
				createdAt: "2023-01-30T15:39:22.550Z",
			},
		];

		getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });

		render(<FeedPage />);
		const post = await screen.findAllByRole("article");
		const postTexts = post.map((p) => p.textContent);

		expect(postTexts).toEqual([
			"30/01/2024, 15:39:22Test Post Newlikes: ",
			"30/01/2023, 15:39:22Test Post Middlelikes: ",
			"30/01/2022, 15:39:22Test Post Oldlikes: "
		]);
	});

	test("It navigates to login if no token is present", async () => {
		render(<FeedPage />);
		const navigateMock = useNavigate();
		expect(navigateMock).toHaveBeenCalledWith("/login");
	});
});
