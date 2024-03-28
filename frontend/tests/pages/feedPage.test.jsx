import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from '@testing-library/user-event'
import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getPosts } from "../../src/services/posts";
import { useNavigate } from "react-router-dom";

// Mocking the getPosts service
vi.mock("../../src/services/posts", () => {
  const getPostsMock = vi.fn();
  return { getPosts: getPostsMock };
});



// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

// Reusable function for filling out create post form
  const completePost = async () => {
    const user = userEvent.setup();

    const messageInputEl = screen.getByTestId("post-message")
    const submitButtonEl = screen.getByRole("submit-button");

    await user.type(messageInputEl, "test message");
    await user.click(submitButtonEl);
  }

describe("Feed Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("It displays posts from the backend", async () => {
    window.localStorage.setItem("token", "testToken");

    const mockPosts = [{ _id: "12345", message: "Test Post 1" }];

    getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });

    render(<FeedPage />);

    const post = await screen.findByRole("article");
    expect(post.textContent).toEqual("Test Post 1");
  });

  test("It navigates to login if no token is present", async () => {
    render(<FeedPage />);
    const navigateMock = useNavigate();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  test("It renders with CreatePost component", async () =>{
    render (<FeedPage />);
    // eslint-disable-next-line vitest/valid-expect
    expect(screen.getByTestId('create-post-component')).to.exist;
  })

  // test("There is an input field for message and you can click a submit button", async () =>{
  //   render (<FeedPage />);
  //   await completePost();
  //   const post = await screen.findByRole("article");
  //   expect(post.textContent).toEqual("test message");
  // })
});
