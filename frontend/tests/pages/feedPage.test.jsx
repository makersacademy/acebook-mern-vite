import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import PostsController from "../../../api/controllers/posts";

import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getPosts } from "../../src/services/posts";
import { getId } from "../../src/services/users";
import { useNavigate } from "react-router-dom";

// Mocking the getPosts service
vi.mock("../../src/services/posts", () => {
  const getPostsMock = vi.fn();
  return { getPosts: getPostsMock };
});

// Mocking the getId service
vi.mock("../../src/services/users", () => {
  const getIdMock = vi.fn();
  return { getId: getIdMock };
});

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

describe("Feed Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("It displays posts from the backend", async () => {
    window.localStorage.setItem("token", "testToken");

    const mockPosts = [{ _id: "12345", message: "Test Post 1", likes: [] }];

    getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });
    getId.mockResolvedValue({user_id: '1'});

    render(<FeedPage />);

    const post = await screen.findByRole("article");
    expect(post.textContent).toEqual("Test Post 1");
  });

  test("It navigates to login if no token is present", async () => {
    render(<FeedPage />);
    const navigateMock = useNavigate();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  test('Creates a new post if token present', async () => {
    window.localStorage.setItem("token", "testToken");
    const mockPosts = [{ _id: "12345", message: "Test Post 1", likes: [] }];
    getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });
    getId.mockResolvedValue({user_id: '1'});

    const navigateMock = useNavigate();
    render(<FeedPage />);
    
    const user = userEvent.setup();
    const postInputEl = screen.getByTestId("post-input");
    const submitButtonEl = screen.getByRole("submit-button");

    await user.type(postInputEl, "testing the new post feature");
    await user.click(submitButtonEl);
   
    expect(navigateMock).toHaveBeenCalledWith('/posts');


  });
});
