import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { HomePage } from "../../src/pages/Home/HomePage";
import userEvent from "@testing-library/user-event";

describe("Home Page", () => {
  test("welcomes you to the site", () => {
    render(<HomePage setPage={() => {}} />);

    const heading = screen.getByRole("heading");
    expect(heading.textContent).toEqual("Welcome to Acebook!");
  });

  test("Displays a signup link", async () => {
    const user = userEvent.setup();

    const setPageMock = vi.fn();
    render(<HomePage setPage={setPageMock} />);

    const signupLink = screen.getByText("Sign Up");
    await user.click(signupLink);
    expect(setPageMock).toHaveBeenCalledWith("signup");
  });

  test("Displays a login link", async () => {
    const user = userEvent.setup();

    const setPageMock = vi.fn();
    render(<HomePage setPage={setPageMock} />);

    const loginLink = screen.getByText("Log In");
    await user.click(loginLink);
    expect(setPageMock).toHaveBeenCalledWith("signup");
  });
});
