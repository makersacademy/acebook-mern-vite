import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import { HomePage } from "../../src/pages/Home/HomePage";
import Navbar from "../../src/components/navbar/Navbar";


describe("Navbar", () => {
    test("Navbar renders the home button correctly", () => {
        // render the component
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        )
        // Assert
        expect(screen.getByText("Homepage")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByText("Sign Up")).toBeInTheDocument();
        expect(screen.getByText("Feed")).toBeInTheDocument();
        expect(screen.getByText("Logout")).toBeInTheDocument();

    });
    test('Navbar link navigates to the Home page', () => {
        render(
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        );
        // Check if the link is present
        const homeLink = screen.getByText('Homepage');
        // Simulate a user click on the link
        fireEvent.click(homeLink);
        // Check if the expected navigation has occurred
        expect(window.location.pathname).toBe('/');
      });
      test('Navbar link navigates to the Login page', () => {
        render(
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        );
        // Check if the link is present
        const homeLink = screen.getByText('Login');
        // Simulate a user click on the link
        fireEvent.click(homeLink);
        // Check if the expected navigation has occurred
        expect(window.location.pathname).toBe('/login');
      });
      test('Navbar link navigates to the Signup page', () => {
        render(
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        );
        // Check if the link is present
        const homeLink = screen.getByText('Sign Up');
        // Simulate a user click on the link
        fireEvent.click(homeLink);
        // Check if the expected navigation has occurred
        expect(window.location.pathname).toBe('/signup');
      });
      test('Navbar link navigates to the Feed page', () => {
        render(
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        );
        // Check if the link is present
        const homeLink = screen.getByText('Feed');
        // Simulate a user click on the link
        fireEvent.click(homeLink);
        // Check if the expected navigation has occurred
        expect(window.location.pathname).toBe('/posts');
      });
})

