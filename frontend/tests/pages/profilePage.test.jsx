import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { getUser } from "../../src/services/users";
import { getProfilePosts } from "../../src/services/posts";
import { useNavigate } from "react-router-dom";
import { ProfilePage } from "../../src/pages/Profile/ProfilePage";

vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  const linkMock = vi.fn();
  return { useNavigate: useNavigateMock, Link: linkMock};
});

// Mocking the getUser service
vi.mock("../../src/services/users", () => {
    const getUserMock = vi.fn();
    return { getUser : getUserMock }
});

vi.mock("../../src/services/posts", () => {
  const getProfilePostsMock = vi.fn();
  return { getProfilePosts : getProfilePostsMock }
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

  test("It displays posts from the backend", async () => {
    window.localStorage.setItem("token", "testToken");

    const mockPosts = [{ _id: "12345", message: "Test Post 1", post_date: '2024-04-01T09:40:18.010Z' }];

    getProfilePosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });

    render(<ProfilePage />);

    const post = await screen.findByRole("article");
    expect(post.textContent).toContain("Test Post 1");

  });

  test("It navigates to login if no token is present", async () => {
    render(<ProfilePage />);
    const navigateMock = useNavigate();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

});
