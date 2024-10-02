import { render, screen } from "@testing-library/react";

import { ProfilePage } from "../../src/pages/Profile/ProfilePage";

describe("Profile Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("It displays a page heading", async () => {

    render(<ProfilePage />);

    const post = await screen.findByRole("heading");
    expect(post.textContent).toEqual("Welcome to your profile!");
  });

});

