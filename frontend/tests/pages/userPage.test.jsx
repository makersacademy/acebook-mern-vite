import { render, screen } from "@testing-library/react";

import { useNavigate } from "react-router-dom";

import { UserPage } from "../../src/pages/User/UserPage";
import { describe } from "vitest";

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
    const navigateMock = vi.fn();
    const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
    return { useNavigate: useNavigateMock };
});

describe('User Page', () => {
    beforeEach(() => {
        window.localStorage.removeItem("token");
        });

    test('loads user page', async () => {
        window.localStorage.setItem("token", "testToken");

        render(<UserPage />);

        const user = await screen.findByText("testuser");
        expect(user.textContent).toEqual("testuser");
    })

    test("It navigates to login if no token is present", async () => {
        render(<UserPage />);
        const navigateMock = useNavigate();
        expect(navigateMock).toHaveBeenCalledWith("/login");
    });
})
