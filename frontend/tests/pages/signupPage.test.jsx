import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { signup } from "../../src/services/authentication";

import { SignupPage } from "../../src/pages/Signup/SignupPage";

// Mocking the signup service
vi.mock("../../src/services/authentication", () => {
  const signupMock = vi.fn();
  return { signup: signupMock };
});

// Reusable function for filling out signup form
const completeSignupForm = async () => {
  const user = userEvent.setup();

  const emailInputEl = screen.getByLabelText("Email:");
  const passwordInputEl = screen.getByLabelText("Password:");
  const submitButtonEl = screen.getByRole("submit-button");

  await user.type(emailInputEl, "test@email.com");
  await user.type(passwordInputEl, "1234");
  await user.click(submitButtonEl);
};

describe("Signup Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("allows a user to signup", async () => {
    render(<SignupPage setPage={() => {}} />);

    await completeSignupForm();

    expect(signup).toHaveBeenCalledWith("test@email.com", "1234");
  });

  test("navigates to /login on successful signup", async () => {
    const setPageMock = vi.fn();
    render(<SignupPage setPage={setPageMock} />);

    await completeSignupForm();

    expect(setPageMock).toHaveBeenCalledWith("login");
  });

  test("navigates to /signup on unsuccessful signup", async () => {
    const setPageMock = vi.fn();
    render(<SignupPage setPage={setPageMock} />);

    signup.mockRejectedValue(new Error("Error signing up"));

    await completeSignupForm();

    expect(setPageMock).toHaveBeenCalledWith("signup");
  });
});
