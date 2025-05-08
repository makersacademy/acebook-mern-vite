import { render, screen} from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event"
import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getPosts, createPost } from "../../src/services/posts";
import { useNavigate } from "react-router-dom";


// Mocking the getPosts service
vi.mock("../../src/services/posts", () => {
  const getPostsMock = vi.fn();
  const createPostMock = vi.fn(); 
  return { 
    getPosts: getPostsMock,
    createPost: createPostMock,
  };
});

// vi.mock("../../src/components/NewPost", () => {
//   const submitContentMock = vi.fn();
//   return { 
//     submitContent: submitContentMock,
//   };
// });

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { 
    useNavigate: useNavigateMock, 
    Link: ({ children }) => <a>{children}</a> };
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
  });

  test("Button click calls createPost", async () => {
    window.localStorage.setItem("token", "testToken");
    const mockPosts = [{}];
    getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });
    render(<FeedPage />);
    const textBox = screen.getByLabelText('Enter Post Content');
    await userEvent.type(textBox, 'This is a test post!');
    expect(textBox.value).toBe('This is a test post!');
    const submitButton = screen.getByRole("button", { name: /Submit Post/i });
    await userEvent.click(submitButton);
    expect(createPost).toHaveBeenCalledTimes(1);
  })

  test("Button click displays new post on page", async () => {
    window.localStorage.setItem("token", "testToken");
    let mockPosts = [{}];
    getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });
    render(<FeedPage />);
    mockPosts = [{ _id: "12345", message: "Test Post 1" }];
    getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });
    const textBox = screen.getByLabelText('Enter Post Content');
    await userEvent.type(textBox, 'This is a test post!');
    expect(textBox.value).toBe('This is a test post!');
    const submitButton = screen.getByRole("button", { name: /Submit Post/i });
    await userEvent.click(submitButton);
    const post = await screen.findByRole("article");
    expect(post.textContent).toContain("Test Post 1");

  })
});
