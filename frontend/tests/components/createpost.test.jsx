import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import CreatePost from "../../src/components/Post/CreatePost"
import { createPosts } from "../../src/services/posts";
import {handleCreatePost} from "../../src/pages/Feed/FeedPage"
// import { UploadWidget } from "../../src/components/Post/UploadWidget"
// import { useNavigate } from "react-router-dom";


/// MOCKS

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

// Mock the upload widget
vi.mock("../../src/components/Post/UploadWidget", () => {
  const UploadWidgetMock = vi.fn();
  return { UploadWidget: UploadWidgetMock };
});

  // Mocking the createPosts service
vi.mock("../../src/services/posts", () => {
  const createPostsMock = vi.fn();
  return { createPosts: createPostsMock };
});

  // Mocking the handleCreatePost service
vi.mock("../../src/pages/Feed/FeedPage", () => {
  const handleCreatePostMock = vi.fn();
  return { handleCreatePost: handleCreatePostMock };
});

const testingInstructions = async () =>{
  const user = userEvent.setup()
  window.localStorage.setItem("token", "testToken");
  const fillMessage = screen.getByTestId('post-message');
  const submitBut = screen.getByRole('submit-button');
  await user.type(fillMessage, 'Test message AF');
  await user.click(submitBut)
}

// window.localStorage.setItem("token", "testToken"); //SET NEW TOKEN
describe("Create Post Test Suite", () => {
    beforeEach(() => {
        vi.resetAllMocks();
        window.localStorage.removeItem("token");
      });

    test("Entering message and clicking submit makes a successful call", async () => {
        render(<CreatePost onCreatePost={handleCreatePost}/>);
        await testingInstructions()
    expect(createPosts).toHaveBeenCalledWith("testToken","Test message AF");
    });

    test("Entering message and clicking submit clears the message field", async () => {
        render(<CreatePost onCreatePost={handleCreatePost}/>);
        await testingInstructions() 
        const messageInput = screen.getByTestId("post-message");
    expect(messageInput.value).toBe("");


    });
    test("entering message and clicking submit calls the handleCreateFunction", async () => {
        render(<CreatePost onCreatePost={handleCreatePost}/>);
        await testingInstructions() 
    expect(handleCreatePost).toBeCalled();
    });
  });
