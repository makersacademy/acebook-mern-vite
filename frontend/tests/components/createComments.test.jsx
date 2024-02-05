import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/react";
import CreateComment from "../../src/components/Comments/CreateComment";
import { BrowserRouter } from "react-router-dom";

describe("Tests the create Comment interface", () => {
    it("renders with the correct heading", () => {
        // BrowserRouter
        //https://stackoverflow.com/questions/70491774/usenavigate-may-be-used-only-in-the-context-of-a-router-component
        render(
            <BrowserRouter>
                <CreateComment />
            </BrowserRouter>
        );

        expect(screen.getByText("Create A Comment").textContent).toBe(
            "Create A Comment"
        );
    });

    it("The Comment input field is on the page", () => {
        render(
            <BrowserRouter>
                <CreateComment />
            </BrowserRouter>
        );
        const commentInput = screen.getByPlaceholderText(
            "Write your comment here..."
        );
        expect(commentInput.id).toBe("commentContent");
    });

    it("When we type into the create a comment input box, the text appears in the input", () => {
        render(
            <BrowserRouter>
                <CreateComment />
            </BrowserRouter>
        );
        const commentInput = screen.getByPlaceholderText(
            "Write your comment here..."
        );
        fireEvent.change(commentInput, {
            target: { value: "I'm testing the comment input box" },
        });
        expect(commentInput.value).toBe("I'm testing the comment input box");
    });

    it("When we submit our comment, the input box goes back to empty", async () => {
        render(
            <BrowserRouter>
                <CreateComment />
            </BrowserRouter>
        );
        const commentInput = screen.getByPlaceholderText(
            "Write your comment here..."
        );
        const createCommentBtn = screen.getByRole("button", { name: "submit" });
        fireEvent.change(commentInput, {
            target: { value: "I'm testing the comment input box" },
        });
        fireEvent.click(createCommentBtn);
        await waitFor(() => {
            expect(commentInput.value).toBe("");
        });
    });

    it("When we submit our valid comment, it appears on the page", async () => {
        render(
            <BrowserRouter>
                <CreateComment />
            </BrowserRouter>
        );
        const commentInput = screen.getByPlaceholderText(
            "Write your comment here..."
        );
        const createCommentBtn = screen.getByRole("button", { name: "submit" });
        fireEvent.change(commentInput, {
            target: { value: "I'm testing the comment input box" },
        });
        fireEvent.click(createCommentBtn);
        await waitFor(() => {
            expect(
                screen.getByText("I'm testing the comment input box")
                    .textContent
            ).toBe("I'm testing the comment input box");
        });
    });

    // Page loads without the error message
    // it("When we submit an empty comment, an error message appears on the page", async () => {
    //     render(
    //         <BrowserRouter>
    //             <CreatePost />
    //         </BrowserRouter>
    //     );
    //     const postInput = screen.getByPlaceholderText(
    //         "Write your post here..."
    //     );
    //     const createPostBtn = screen.getByRole("button", { name: "submit" });
    //     fireEvent.change(postInput, {
    //         target: { value: "" },
    //     });
    //     await fireEvent.click(createPostBtn);
    //     await waitFor(() => {
    //         expect(
    //             screen.getByText("posts must not be blank").textContent
    //         ).toBe("posts must not be blank");
    //     });
    // });
});
