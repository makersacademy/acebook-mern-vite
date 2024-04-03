import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
// import userEvent from '@testing-library/user-event'
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
  const linkMock = vi.fn();
  return { useNavigate: useNavigateMock, Link: linkMock};
});

// Reusable function for filling out create post form
  // const completePost = async () => {
  //   const user = userEvent.setup();

  //   const messageInputEl = screen.getByTestId("post-message")
  //   const submitButtonEl = screen.getByRole("submit-button");

  //   await user.type(messageInputEl, "test message");
  //   await user.click(submitButtonEl);
  // }

describe("Feed Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("It displays posts from the backend", async () => {
    window.localStorage.setItem("token", "testToken");

    const mockPosts = [{ _id: "12345", message: "Test Post 1", post_date: '2024-04-01T09:40:18.010Z'}];

    getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });

    render(<FeedPage />);

    const post = await screen.findByRole("article");
    expect(post.textContent).toContain("Test Post 1");
  });

  test('renders posts in correct order', async () => {
    window.localStorage.setItem("token", "testToken");
    const mockPosts = [
      { _id: '1', message: 'Test 1', post_date: '2024-04-01T09:40:18.010Z' },
      { _id: '2', message: 'Test 2', post_date: '2021-04-01T09:40:18.010Z' },
      { _id: '3', message: 'Test 3', post_date: '2023-04-01T09:40:18.010Z' }
    ];
  
    getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });
    // Render the component with the articles
    render(<FeedPage />);
  
    // Find the list items by text content
    const post1 = await screen.findByText('Test 1');
    const post2 = await screen.findByText('Test 2');
    const post3 = await screen.findByText('Test 3');

    // Assert the order based on their positions in the DOM
    expect(post1.compareDocumentPosition(post3)).toBeGreaterThan(0);
    expect(post3.compareDocumentPosition(post2)).toBeGreaterThan(0);
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

  //("There is an input field for message and you can click a submit button", async () =>{
  //   render (<FeedPage />);
  //   await completePost();
  //   const post = await screen.findByRole("article");
  //   expect(post.textContent).toEqual("test message");
  // })
});
