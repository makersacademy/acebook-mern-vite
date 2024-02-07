import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, beforeEach, test, expect } from "vitest";
import { useParams } from "react-router-dom";
import { PostPage } from "../../src/pages/IndividualPost/IndividualPostPage";
import { getSinglePost } from "../../src/services/posts";
import { getAllComments } from "../../src/services/comments";

// Mocking the getSinglePost service
vi.mock("../../src/services/posts", () => {
    const getSinglePostMock = vi.fn();
    return { getSinglePost: getSinglePostMock };
});

// Mocking the getAllComments service
vi.mock("../../src/services/comments", () => {
    const getAllCommentsMock = vi.fn();
    return { getAllComments: getAllCommentsMock };
});

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
    const navigateMock = vi.fn();
    const useParams = vi.fn();
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
        const mockComments = [
            {
                _id: "12345",
                message: "Test comment 1",
                username: "user1",
                reg_time: "2024-02-01T12:29:41.763+00:00",
                user: [{username: "user1"}]
            },
        ];
        getSinglePost.mockResolvedValue({ post: mockPost, token: "newToken" });
        getAllComments.mockResolvedValue({
            comments: mockComments,
            token: "newToken",
        });
        //console.log("mockPost:")
        //console.log(mockPost[0])

        render(<PostPage />);

        const postElement = await screen.findByRole("postContent");
        //console.log(postElement);

        expect(postElement.textContent).toContain("Test Post 1");
    });
    test("It displays comments from the backend", async () => {
        window.localStorage.setItem("token", "testToken");

        const mockComments = [
            {
                _id: "12345",
                message: "Test comment 1",
                username: "user1",
                reg_time: "2024-02-01T12:29:41.763+00:00",
                user: [{username: "user1"}]
            },
        ];
        vi.mocked(useParams).mockReturnValue({ id: "12345" });
        getAllComments.mockResolvedValue({
            comments: mockComments,
            token: "newToken",
        });
        //console.log("mockComments:");
        //console.log(mockComments);

        render(<PostPage />);

        const comment = await screen.findByRole("CommentsDisplay");
        //console.log(comment);
        expect(comment.textContent).toEqual(
            "Test comment 1user1 01/02/2024 12:29"
        );
    });
});
