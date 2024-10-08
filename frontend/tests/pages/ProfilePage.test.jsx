import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProfilePage } from "../../src/pages/Profile/ProfilePage";
import { vi } from "vitest";

vi.mock("../../src/services/users", () => {
  const getUserMock = vi.fn();
  return { getUser: getUserMock };
});

vi.mock("../../src/services/posts", () => {
  const getPostsMock = vi.fn();
  return { getPosts: getPostsMock };
});

describe("Profile Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("It displays a page heading", async () => {
    window.localStorage.setItem("token", "testToken");
    render( 
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    const heading = await screen.findByTestId("profilePage-h1");
    console.log(heading)
    expect(heading.textContent).toEqual("Welcome to your profile!");
  });



});

