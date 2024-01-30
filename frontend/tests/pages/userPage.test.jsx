import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
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

        const user = await screen.findByRole("header");
        expect(user.textContent).toEqual("testuser");
    })
})
