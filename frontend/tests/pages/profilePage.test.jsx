import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { ProfilePage } from "../../src/pages/Profile/ProfilePage";
import { getProfile } from "../../src/services/Profile";
import { useNavigate } from "react-router-dom";

// Mocking the getProfile service
vi.mock("../../src/services/profile", () => {
    const getProfileMock = vi.fn();
    return { getProfile: getProfileMock };
  });
  
  // Mocking React Router's useNavigate function
  vi.mock("react-router-dom", () => {
    const navigateMock = vi.fn();
    const linkMock = vi.fn();
    const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
    return { useNavigate: useNavigateMock, Link: linkMock};
  });

  describe("Profile Page", () => {
    beforeEach(() => {
      window.localStorage.removeItem("token");
    });
  
    test("It displays Profiles from the backend", async () => {
      window.localStorage.setItem("token", "testToken");
  
      const mockProfile = [{_id: "123", username: "user1", email: "email1@email.com" }];
      //checking whether mockProfile is correct
      //console.log(mockProfile);
  
      getProfile.mockResolvedValue({ users: mockProfile, token: "newToken" });
  
      render(<ProfilePage />);
  
      const user = await screen.findByRole("profile");
      //check to see whether ProfilePage is rendering
      //console.log(user)

      expect(user.textContent).toContain("Username: user1Email: email1@email.com");
    });

    test("It navigates to login if no token is present", async () => {
        render(<ProfilePage />);
        const navigateMock = useNavigate();
        expect(navigateMock).toHaveBeenCalledWith("/login");
      });

});