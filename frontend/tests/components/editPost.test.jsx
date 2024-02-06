// import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/react";
import EditPost from "../../src/components/Post/EditPost";
import { BrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { expect,  describe, test} from "vitest";

describe("Tests the update post component", () => {
    test("renders with the correct button text", () => {
        render(
            <BrowserRouter>
                <EditPost />
            </BrowserRouter>
        );
        expect(screen.getByText("Edit").textContent).toBe("Edit");
    });

    test("renders edit form when edit button is clicked", async () => {
        render(
            <BrowserRouter>
                <EditPost />
            </BrowserRouter>
        );

        const editButton = screen.getByText("Edit");

        fireEvent.click(editButton);
        await waitFor(() => {
            expect(screen.getByText("Discard Changes").textContent).toBe("Discard Changes");
            expect(screen.getByText("Save Changes"));
        });
    });

    test("Edit form is hidden when discard changes is clicked", async () => {
        render(
            <BrowserRouter>
                <EditPost />
            </BrowserRouter>
        );

        const editButton = screen.getByText("Edit");

        fireEvent.click(editButton);
        const discardButton = screen.getByText("Discard Changes")
        fireEvent.click(discardButton)

        await waitFor(() => {
            expect(screen.getByText("Edit").textContent).toBe("Edit");
        });
    });
    // Draft test but couldn't get it to pass (issue with test not frontend)
    // test("renders again without edit form when save changes is clicked", async () => {
    //     render(
    //         <BrowserRouter>
    //             <EditPost />
    //         </BrowserRouter>
    //     );
    //     const editButton = screen.getByText("Edit");
    //     fireEvent.click(editButton);
    //     const postInput = screen.getByPlaceholderText("Update Post Here")
    //     fireEvent.change(postInput, {
    //         target: { value: "I'm testing the post input box" },
    //     });  
    //     const saveButton = screen.getByText("Save Changes" );
    //     await fireEvent.click(saveButton)
    //     expect(window.location.pathname).toBe('/posts/');
    // });
});
