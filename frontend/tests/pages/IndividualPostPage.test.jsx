import { render, screen } from "@testing-library/react";
import { vi, describe, beforeEach, test, expect } from "vitest";
import { useParams } from 'react-router-dom';
import { PostPage } from "../../src/pages/IndividualPost/IndividualPostPage";
import { getSinglePost } from "../../src/services/posts";

// Mocking the getSinglePost service
vi.mock("../../src/services/posts", () => {
  const getSinglePostMock = vi.fn();
  return { getSinglePost: getSinglePostMock };
});

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useParams = vi.fn()
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock, useParams: useParams };
});

describe("Individual Post Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("It displays a post from the backend", async () => {
    window.localStorage.setItem("token", "testToken");
    const mockPost = [{ _id: "12345", message: "Test Post 1" }];
    vi.mocked(useParams).mockReturnValue({ id: "12345" });

    getSinglePost.mockResolvedValue({ post: mockPost[0], token: "newToken" });

    render(<PostPage />);

    const postElement = await screen.findByRole("article");

    expect(postElement.textContent).toContain("Test Post 1");
  });
});