import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, test, beforeEach, expect } from "vitest";

import { useNavigate } from "react-router-dom";
import { signup } from "../../src/services/authentication";

import { SignupPage } from "../../src/pages/Signup/SignupPage";

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

// Mocking the signup service
vi.mock("../../src/services/authentication", () => {
  const signupMock = vi.fn();
  return { signup: signupMock };
});

// Reusable function for filling out signup form - Correct input
const completeSignupForm = async (username, email, password, confirmPassword) => {
  const user = userEvent.setup();

  const userNameInputEl = screen.getByLabelText("Username:")
  const emailInputEl = screen.getByLabelText("Email:");
  const passwordInputEl = screen.getByLabelText("Password:");
  const confirmPasswordInputEl = screen.getByLabelText("Confirm Password:");
  const submitButtonEl = screen.getByRole("submit-button");

  await user.type(userNameInputEl, username)
  await user.type(emailInputEl, email);
  await user.type(passwordInputEl, password);
  await user.type(confirmPasswordInputEl, confirmPassword)
  await user.click(submitButtonEl);
};


describe("Signup Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("allows a user to signup", async () => {
    render(<SignupPage />);

    await completeSignupForm("testUser", "test@email.com", "Password1!", "Password1!");

    expect(signup).toHaveBeenCalledWith("testUser", "test@email.com", "Password1!");
  });

  test("navigates to /login on successful signup", async () => {
    render(<SignupPage />);

    const navigateMock = useNavigate();

    await completeSignupForm("testUser", "test@email.com", "Password1!", "Password1!");

    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  test("navigates to /signup on unsuccessful signup", async () => {
    render(<SignupPage />);

    signup.mockRejectedValue(new Error("Error signing up"));
    const navigateMock = useNavigate();

    await completeSignupForm("testUser", "test@email.com", "Password!", "Password!");

    expect(navigateMock).toHaveBeenCalledWith("/signup");
  });

  test("navigates to /signup when passwords don't match", async () => {
    render(<SignupPage />);
    const navigateMock = useNavigate();
    await completeSignupForm("testUser", "test@email.com", "Password!", "Password?");

    expect(navigateMock).toHaveBeenCalledWith("/signup");
  });

  test("navigates to /signup when password is too short", async () => {
    render(<SignupPage />);
    const navigateMock = useNavigate();
    await completeSignupForm("testUser", "test@email.com", "Pass1!", "Pass1!");

    expect(navigateMock).toHaveBeenCalledWith("/signup");
  });

  test("navigates to /signup when password does not contain ! ? $ % or £", async () => {
    render(<SignupPage />);
    const navigateMock = useNavigate();
    await completeSignupForm("testUser", "test@email.com", "Password1", "Password1");

    expect(navigateMock).toHaveBeenCalledWith("/signup");
  });

  test("navigates to /signup when password does not have Capital", async () => {
    render(<SignupPage />);
    const navigateMock = useNavigate();
    await completeSignupForm("testUser", "test@email.com", "password1!", "password1!");

    expect(navigateMock).toHaveBeenCalledWith("/signup");
  });

  test("navigates to /signup when password does not have a number", async () => {
    render(<SignupPage />);
    const navigateMock = useNavigate();
    await completeSignupForm("testUser", "test@email.com", "Password!", "Password!");

    expect(navigateMock).toHaveBeenCalledWith("/signup");
  });
});
