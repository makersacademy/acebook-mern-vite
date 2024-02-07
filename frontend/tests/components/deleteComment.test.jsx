import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/react";
import DeleteCommentButton from "../../src/components/Comments/DeleteCommentButton";
import { BrowserRouter } from "react-router-dom";
import { expect, vi, describe, beforeAll, afterAll, it } from "vitest";

describe("Tests the delete comment button", () => {
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
        const mockComments = {
            _id: "12345",
            message: "Test comment 1",
            username: "user1",
            reg_time: "2024-02-01T12:29:41.763+00:00",
            user: [{username: "user1"}],
            post_id: "123"
        };
        render(
            <BrowserRouter>
                <DeleteCommentButton comment={mockComments}/>
            </BrowserRouter>
        );
        expect(screen.getByText("Delete").textContent).toBe("Delete");
    });

    it("redirects to post page once deleted", async () => {
        const mockComments = {
                _id: "12345",
                message: "Test comment 1",
                username: "user1",
                reg_time: "2024-02-01T12:29:41.763+00:00",
                user: [{username: "user1"}],
                post_id: "123"
            };

        render(
            <BrowserRouter>
                <DeleteCommentButton comment={mockComments} />
            </BrowserRouter>
        );

        const deleteButton = screen.getByText("Delete");
        await fireEvent.click(deleteButton);
        waitFor(() => {
            expect(window.location.pathname).toBe("/posts/find/123");
        });
    });
});
