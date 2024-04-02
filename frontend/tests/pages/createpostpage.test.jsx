import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getPosts, createPosts } from "../../src/services/posts";
import { useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { CreatePostPage } from "../../src/pages/Post/CreatePostPage";
vi.mock("react-router-dom", () => {
    const navigateMock = vi.fn();
    const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
    return { useNavigate: useNavigateMock };
  });
vi.mock("../../src/services/posts", () => {
    const createPostsMock = vi.fn();
    const getPostsMock = vi.fn();
    return { getPosts: getPostsMock, createPosts: createPostsMock };
  });

describe("CreatePostPage", () => {
    beforeEach(() => {
      window.localStorage.removeItem("token");
    });

    test("It navigates to /createpost after clicking the button", async () => {
      window.localStorage.setItem("token", "testToken");
      const mockPosts = [{ _id: "12345", message: "Test Post 1" }];
      getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });
      render(<FeedPage />);
      const navigateMock = useNavigate();
      const button = screen.getByRole("button", { name: "Create Post" })
      fireEvent.click(button)
      expect(navigateMock).toHaveBeenCalledWith("/createpost");
    });
    ``
    test("error pops up when message submitted is empty", async () => {
        window.localStorage.setItem("token", "testToken");
        // Render the CreatePostPage component
        render(<CreatePostPage />);
        const navigateMock = useNavigate();
        // Mock the behavior of createPosts
        createPosts.mockResolvedValue({ message: "", token: "newToken" })
        // Mock window.alert
        const alertMock = (message) => {
            alertMock.calls.push(message);
        };
        alertMock.calls = [];
        // Save the original window.alert and replace it with the mock
        const originalAlert = window.alert;
        window.alert = alertMock;
        // Find and click the submit button
        const button = screen.getByRole("submit-button", { id: "submit" })
        fireEvent.click(button)
        expect(navigateMock).toHaveBeenCalledWith("/createpost");
        expect(alertMock.calls).toContain('message field required');
        // Restore the original window.alert
        window.alert = originalAlert;
    });

    test("error pops up when message submitted is too short", async () => {
        window.localStorage.setItem("token", "testToken");
        // Render the CreatePostPage component
        render(<CreatePostPage />);
        const navigateMock = useNavigate();
        // Mock the behavior of createPosts
        createPosts.mockResolvedValue({ message: "hello", token: "newToken" })
        // Mock window.alert
        const alertMock = (message) => {
            alertMock.calls.push(message);
        };
        const user = userEvent.setup();
        const messageInputEL = screen.getByLabelText("Create a Post:")
        await user.type(messageInputEL, "hello") 
        alertMock.calls = [];
        // Save the original window.alert and replace it with the mock
        const originalAlert = window.alert;
        window.alert = alertMock;
        // Find and click the submit button
        const button = screen.getByRole("submit-button", { id: "submit" })
        fireEvent.click(button)
        expect(navigateMock).toHaveBeenCalledWith("/createpost");
        expect(alertMock.calls).toContain('message is too short');
        // Restore the original window.alert
        window.alert = originalAlert;
    });

    test("submits post and redirects back to /posts endpoint", async () => {
        window.localStorage.setItem("token", "testToken");
        // Render the CreatePostPage component
        render(<CreatePostPage />);
        const navigateMock = useNavigate();
        // Mock the behavior of createPosts
        createPosts.mockResolvedValue({ message: "", token: "newToken" })
          const user = userEvent.setup();
        const messageInputEL = screen.getByLabelText("Create a Post:")    
        await user.type(messageInputEL, "A post that is long enough to pass") 
        // Find and click the submit button
        const button = screen.getByRole("submit-button", { id: "submit" })
        fireEvent.click(button)
        expect(navigateMock).toHaveBeenCalledWith("/posts");
    });
})