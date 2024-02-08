import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import { vi } from "vitest";
import { useNavigate } from "react-router-dom";
import { signup } from "../../src/services/authentication";
import { SignupPage } from "../../src/pages/Signup/SignupPage";


// Mocking React Router's useNavigate function
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual('react-router-dom')
    const MockLink = ({to, children}) => <a href={to}>{children}</a>
    const navigateMock = vi.fn();
    const useNavigateMock = () => navigateMock;
    return {
        ...actual,
        Link:MockLink,
        useNavigate: useNavigateMock
    }

     // Create a mock function for useNavigate
});

// Mocking the signup service
vi.mock("../../src/services/authentication", () => {
    const signupMock = vi.fn();
    return { signup: signupMock };
});

// Reusable function for filling out signup form
const completeSignupForm = async () => {
    const user = userEvent.setup();

    const usernameInputEl = screen.getByLabelText("Username:");
    const emailInputEl = screen.getByLabelText("Email:");
    const passwordInputEl = screen.getByLabelText("Password:");
    const submitButtonEl = screen.getByRole("submit-button");

    await user.type(usernameInputEl, "test user");
    await user.type(emailInputEl, "test@email.com");
    await user.type(passwordInputEl, "cHeck123Test!");
    await user.click(submitButtonEl);


};

describe("Signup Page", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    test("allows a user to sign up", async () => {
        render(<SignupPage />);

        await completeSignupForm();

    expect(signup).toHaveBeenCalledWith("test user", "test@email.com", "cHeck123Test!");
  });


    test("navigates to /login on successful signup", async () => {
        render(<SignupPage />);

        const navigateMock = useNavigate();

        await completeSignupForm();

        expect(navigateMock).toHaveBeenCalledWith("/login");
    });

    test("navigates to /signup on unsuccessful signup", async () => {
        render(<SignupPage />);

        signup.mockRejectedValue(new Error("Error signing up"));
        const navigateMock = useNavigate();

        await completeSignupForm();

        expect(navigateMock).toHaveBeenCalledWith("/signup");
    });
});
