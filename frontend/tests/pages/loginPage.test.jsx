import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { login } from "../../src/services/authentication";
import { LoginPage } from "../../src/pages/Login/LoginPage";

// Mocking the login service
vi.mock("../../src/services/authentication", () => {
  const loginMock = vi.fn();
  return { login: loginMock };
});

// Reusable function for filling out login form
const completeLoginForm = async () => {
  const user = userEvent.setup();

  const emailInputEl = screen.getByLabelText("Email:");
  const passwordInputEl = screen.getByLabelText("Password:");
  const submitButtonEl = screen.getByRole("submit-button");

  await user.type(emailInputEl, "test@email.com");
  await user.type(passwordInputEl, "1234");
  await user.click(submitButtonEl);
};

describe("Login Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("allows a user to login", async () => {
    render(<LoginPage setPage={() => {}} />);

    await completeLoginForm();

    expect(login).toHaveBeenCalledWith("test@email.com", "1234");
  });

  test("navigates to /posts on successful login", async () => {
    const setPageMock = vi.fn();
    render(<LoginPage setPage={setPageMock} />);

    login.mockResolvedValue("secrettoken123");

    await completeLoginForm();

    expect(setPageMock).toHaveBeenCalledWith("posts");
  });

  test("navigates to /login on unsuccessful login", async () => {
    const setPageMock = vi.fn();
    render(<LoginPage setPage={setPageMock} />);

    login.mockRejectedValue(new Error("Error logging in"));

    await completeLoginForm();

    expect(setPageMock).toHaveBeenCalledWith("login");
  });
});
