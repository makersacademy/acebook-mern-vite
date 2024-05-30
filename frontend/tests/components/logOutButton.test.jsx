import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogoutButton from "../../src/components/LogoutButton";
import { vi } from "vitest";
import { useNavigate } from "react-router-dom";

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
    const navigateMock = vi.fn();
    const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
    return { useNavigate: useNavigateMock };
});

describe("LogOut", () => {
    test("It logs the user out and redirects to the login page", async () => {
        window.localStorage.setItem("token", "testToken");
        const user = userEvent.setup();
        const navigateMock = useNavigate();
        render(<LogoutButton />);
    
        const buttonElement = await screen.findByRole("button");

        await user.click(buttonElement); 

        expect(window.localStorage.getItem("token")).toEqual(null);
        expect(navigateMock).toHaveBeenCalledWith("/login");
    });
});
