import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from '@testing-library/user-event'
import { getUser } from "../../src/services/users";
import { useNavigate } from "react-router-dom";
import { ProfilePage } from "../../src/pages/Profile/ProfilePage";

vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

// Mocking the getUser service
vi.mock("../../src/services/users", () => {
    const getUserMock = vi.fn();
    return { getUser : getUserMock }
});

describe("Profile Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("It displays the user from the backend", async () => {
    window.localStorage.setItem("token", "testToken");

    const mockUsers = [{ _id: "12345", email: "test", password: "test", firstName: 'test', lastName: 'test', bio: 'test' }];

    getUser.mockResolvedValue({ user: mockUsers, token: "newToken" });

    render(<ProfilePage />);

    const profileLastName = await screen.findByTestId("profileLastName");
    expect(profileLastName.textContent).toEqual("test");
  });

  test("It navigates to login if no token is present", async () => {
    render(<ProfilePage />);
    const navigateMock = useNavigate();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

});
