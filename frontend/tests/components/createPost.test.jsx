import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/react";
import CreatePost from "../../src/components/CreatePost/CreatePost";
import { BrowserRouter } from "react-router-dom";

describe("Tests the create post interface", () => {
    it("renders with the correct heading", () => {
        // BrowserRouter
        //https://stackoverflow.com/questions/70491774/usenavigate-may-be-used-only-in-the-context-of-a-router-component
        render(
            <BrowserRouter>
                <CreatePost />
            </BrowserRouter>
        );

        expect(screen.getByText("Create A Post").textContent).toBe(
            "Create A Post"
        );
    });

    it("The post input field is on the page", () => {
        render(
            <BrowserRouter>
                <CreatePost />
            </BrowserRouter>
        );
        const postInput = screen.getByPlaceholderText(
            "Write your post here..."
        );
        expect(postInput.id).toBe("postContent");
    });

    it("When we type into the create a post input box, the text appears in the input", () => {
        render(
            <BrowserRouter>
                <CreatePost />
            </BrowserRouter>
        );
        const postInput = screen.getByPlaceholderText(
            "Write your post here..."
        );
        fireEvent.change(postInput, {
            target: { value: "I'm testing the post input box" },
        });
        expect(postInput.value).toBe("I'm testing the post input box");
    });

    it("When we submit our post, the input box goes back to empty", async () => {
        render(
            <BrowserRouter>
                <CreatePost />
            </BrowserRouter>
        );
        const postInput = screen.getByPlaceholderText(
            "Write your post here..."
        );
        const createPostBtn = screen.getByRole("button", { name: "submit" });
        fireEvent.change(postInput, {
            target: { value: "I'm testing the post input box" },
        });
        fireEvent.click(createPostBtn);
        await waitFor(() => {
            expect(postInput.value).toBe("");
        });
    });

    it("When we submit our valid post, it appears on the page", async () => {
        render(
            <BrowserRouter>
                <CreatePost />
            </BrowserRouter>
        );
        const postInput = screen.getByPlaceholderText(
            "Write your post here..."
        );
        const createPostBtn = screen.getByRole("button", { name: "submit" });
        fireEvent.change(postInput, {
            target: { value: "I'm testing the post input box" },
        });
        fireEvent.click(createPostBtn);
        await waitFor(() => {
            expect(
                screen.getByText("I'm testing the post input box").textContent
            ).toBe("I'm testing the post input box");
        });
    });

    // Page loads without the error message
    // it("When we submit an empty post, an error message appears on the page", async () => {
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
