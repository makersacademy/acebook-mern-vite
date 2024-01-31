import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { describe, test, expect } from "vitest";

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

      test('Navbar logout link deletes token', () => {
        render(
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        );
        // Set a dummy token to local storage so we know something is there
        window.localStorage.setItem("token", "testToken");

        // Check the token is present
        expect(window.localStorage.getItem("token")).not.toBeNull();

        // Get the lg out link from the screen
        const logoutLink = screen.getByText('Logout');

        // Simulate a user click on the link
        fireEvent.click(logoutLink);

        // Make sure token is deleted
        expect(window.localStorage.getItem("token")).toBeNull(); 
      });

      test('Logout link redirects to homepage', () => {
        render(
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        );
        
        const logoutLink = screen.getByText('Logout');
        fireEvent.click(logoutLink);
        
        expect(window.location.pathname).toBe('/');
      });
});

