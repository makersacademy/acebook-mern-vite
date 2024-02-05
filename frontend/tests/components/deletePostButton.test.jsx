import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/react";
import DeletePostButton from "../../src/components/Post/DeletePostButton";
import { BrowserRouter } from "react-router-dom";
import { expect, vi, describe, beforeAll, afterAll, it, vitest } from "vitest";

// let confirmDelete = () => {
//     return true;
// };
// vi.mock("../../components/Post/DeletePostButton", () => {
//     const confirmDeleteMock = vi.fn();
//     return { confirmDelete: confirmDeleteMock };
// });

describe("Tests the delete post button", () => {
    let confirmSpy;

    beforeAll(() => {
        // `vi` is used in Vitest similar to `jest` in Jest
        confirmSpy = vi.spyOn(window, "confirm");
        // In Vitest, `mockImplementation` can be used similarly
        confirmSpy.mockImplementation(() => true);
    });

    afterAll(() => {
        // `mockRestore` is available in Vitest as well
        confirmSpy.mockRestore();
    });

    it("renders with the correct button text", () => {
        render(
            <BrowserRouter>
                <DeletePostButton />
            </BrowserRouter>
        );
        expect(screen.getByText("Delete").textContent).toBe("Delete");
    });

    it("redirects to Feed page once deleted", async () => {
        render(
            <BrowserRouter>
                <DeletePostButton />
            </BrowserRouter>
        );

        const deleteButton = screen.getByText("Delete");
        // confirmDelete.mockResolvedValue(true);
        fireEvent.click(deleteButton);
        // window.confirm = vi.fn().mockImplementation(() => true);
        // // const okButton = window.confirm("OK");
        // // console.log("okbutton", okButton);
        // // fireEvent.click(okButton);
        // // console.log(window.location.href);
        await waitFor(() => {
            // expect(screen.getByText("Posts").textContent).toBe("Posts");
            // expect(screen.getByRole("heading").textContent).toBe("Posts");
            expect(window.location.pathname).toBe("/posts");
        });
    });
});
