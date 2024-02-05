import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import PostsController from "../../../api/controllers/posts";

import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getPosts } from "../../src/services/posts";
import { getComment } from "../../src/services/comment";
import { useNavigate } from "react-router-dom";

// Mocking the getPosts service
vi.mock("../../src/services/comment", () => {
  const getCommentMock = vi.fn();
  return { getComment: getCommentMock };
});

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

  test('Creates a new post if token present', async () => {
    window.localStorage.setItem("token", "testToken");
    const mockPosts = [{ _id: "12345", message: "Test Post 1", }];
    getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });
    const navigateMock = useNavigate();
    render(<FeedPage />);
    
    const user = userEvent.setup();
    const postInputEl = screen.getByTestId("post-input");
    const submitButtonEl = screen.getByRole("submit-button");

    await user.type(postInputEl, "testing the new post feature");
    await user.click(submitButtonEl);
   
    expect(navigateMock).toHaveBeenCalledWith('/posts');


  });

  test('Creates a new comment if token present', async () => {
    window.localStorage.setItem("token", "testToken");
    const mockPosts = [{ _id: "12345", message: "Test Post 1", }];
    getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });
    const mockComment = [{ _id: "12345", message: "Test Commment 1", }];
    getComment.mockResolvedValue({ posts: mockComment, token: "newToken" });
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
