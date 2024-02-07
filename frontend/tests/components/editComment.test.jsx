import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/react";
import EditComment from "../../src/components/Comments/EditComment";
import { BrowserRouter } from "react-router-dom";
import { expect,  describe, test} from "vitest";

describe("Tests the update comments component", () => {
    test("renders with the correct button text", () => {
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
                <EditComment comment={mockComments}/>
            </BrowserRouter>
        );
        expect(screen.getByText("Edit").textContent).toBe("Edit");
    });

    test("renders edit form when edit button is clicked", async () => {
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
                <EditComment comment = {mockComments}/>
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
                <EditComment comment={mockComments}/>
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
});