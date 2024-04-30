import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HomePage } from "../../src/pages/Home/HomePage";

describe("Home Page", () => {
  test("Tagline is displayed", () => {
    // We need the Browser Router so that the Link elements load correctly
    render(
      <BrowserRouter>
      <GoogleOAuthProvider clientId="108211060185-rc1g9je54b5hsufug7fho331oerfrpk2.apps.googleusercontent.com">
        <HomePage />
      </GoogleOAuthProvider>
      </BrowserRouter>
    );

    const tagline = screen.getByRole("heading");
    expect(tagline.textContent).toEqual("Let's get Kwizical!");
  });

  test("Displays 'play as guest' link", async () => {
    render(
      <BrowserRouter>
      <GoogleOAuthProvider clientId="108211060185-rc1g9je54b5hsufug7fho331oerfrpk2.apps.googleusercontent.com">
        <HomePage />
      </GoogleOAuthProvider>
      </BrowserRouter>
    );

    const playAsGuest = screen.getByText("Play as guest");
    expect(playAsGuest.getAttribute("href")).toEqual("/kwizical");
  });

  test("Displays a Google link", async () => {
    render(
      <BrowserRouter>
      <GoogleOAuthProvider clientId="108211060185-rc1g9je54b5hsufug7fho331oerfrpk2.apps.googleusercontent.com">
        <HomePage />
      </GoogleOAuthProvider>
      </BrowserRouter>
    );

    const googleLoginButton = screen.getByRole("button", {
      name: /sign in with google to play/i,
    });
    expect(googleLoginButton).toBeInTheDocument();
    expect(googleLoginButton).toHaveTextContent("Sign in with Google to play");
  });
});
