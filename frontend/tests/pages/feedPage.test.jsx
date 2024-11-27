import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event"
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
  return { useNavigate: useNavigateMock, Link: ({ children }) => <a>{children}</a> };
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
    expect(post.textContent).toContain("Test Post 1");
  });

  test("It navigates to login if no token is present", async () => {
    render(<FeedPage />);
    const navigateMock = useNavigate();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  test("Typing in text box updates text box", async () => {
    window.localStorage.setItem("token", "testToken");
    render(<FeedPage />);
    const textBox = screen.getByLabelText('Enter Post Content');
    await userEvent.type(textBox, 'This is a test post!');
    expect(textBox.value).toBe('This is a test post!');
  })


  // beforeEach(() => {
  //   window.fetch = vi.fn();
  // });
  
  // afterEach(() => {
  //   vi.restoreAllMocks();
  // });

  test("Creating a post adds it to the feed", async () => {
    window.localStorage.setItem("token", "testToken");
    render(<FeedPage />);
  
    const textBox = screen.getByLabelText("Enter Post Content");
    await userEvent.type(textBox, "This is a test post!");
  
    // Mock the fetch call
    window.fetch.mockResolvedValueOnce(
      new Response(
        JSON.stringify({ message: "Post Created", token: "newToken" }),
        { status: 201 }
      )
    );
  
    const button = screen.getByRole("button", { name: /submit post/i });
    await userEvent.click(button);
  
    const fetchArguments = window.fetch.mock.calls[0]; // Get the first fetch call
    const options = fetchArguments[1];
    const body = JSON.parse(options.body);
    const message = body.message;
  
    const mockPosts = [{ _id: "1234", message }];
    getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });
  
    const post = await screen.findByRole("article");
    expect(post.textContent).toContain("This is a test post!");
  });
});