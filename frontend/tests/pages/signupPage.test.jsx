import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { useNavigate } from "react-router-dom";
import { signup } from "../../src/services/authentication";
import { SignupPage } from "../../src/pages/Signup/SignupPage";
import bcrypt from "bcryptjs-react";

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

// Mocking the signup service
vi.mock("../../src/services/authentication", () => {
  const passwordMock = vi.fn();
  return { password: passwordMock };
});

// Reusable function for filling out signup form
const completeSignupForm = async () => {
  const user = userEvent.setup();
  const emailInputEl = screen.getByLabelText("Email:");
  const passwordInputEl = screen.getByLabelText("Password:");
  const firstNameInputEl = screen.getByLabelText("First Name:");
  const lastNameInputEl = screen.getByLabelText("Last Name:");
  const bioInputEl = screen.getByLabelText("Bio:");
  const submitButtonEl = screen.getByRole("submit-button");
  await user.type(emailInputEl, "test@email.com");
  await user.type(passwordInputEl, "1234");
  await user.type(firstNameInputEl, "Test First Name");
  await user.type(lastNameInputEl, "Test Last Name");
  await user.type(bioInputEl, "Test Bio");
  await user.click(submitButtonEl);
};

describe("Signup Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  test("allows a user to signup", async () => {
    render(<SignupPage />)
    await completeSignupForm();
    // let password = '1234'
    // const hashedPassword = await bcrypt.hash('1234', 10)
    expect(signup).toHaveBeenCalledWith("Test First Name", "Test Last Name", "Test Bio", "test@email.com", (hashedPassword));
  });
  test("navigates to /login on successful signup", async () => {
    render(<SignupPage />);
    const navigateMock = useNavigate();
    await completeSignupForm();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  // test("navigates to /signup on unsuccessful signup", async () => {
  //   render(<SignupPage />);
  //   signup.mockRejectedValue(new Error("Error signing up"));
  //   const navigateMock = useNavigate();
  //   await completeSignupForm();
  //   expect(navigateMock).toHaveBeenCalledWith("/signup");
  // });
  
  // test("logs an error message when signup fails", async () => {
  //   render(<SignupPage />);
  //   const consoleSpy = jest.spyOn(console, "error");
  //   signup.mockRejectedValue(new Error("Error signing up"));
  //   await completeSignupForm();
  //   expect(consoleSpy).toHaveBeenCalledWith("Error signing up");
  //   consoleSpy.mockRestore(); // Restore the original console.error implementation
  // });
});