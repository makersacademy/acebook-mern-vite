import { render, screen } from "@testing-library/react";
import { MemoryRouter, BrowserRouter } from "react-router-dom"; // Setup automatic routing to it without needing to login
import NavBar from "../../src/components/NavBar";
import userEvent from '@testing-library/user-event';

import { ProfilePage } from "../../src/pages/Profile/ProfilePage";
import { getPosts } from "../../src/services/posts";

// Navigation


describe("NavBar Component", () => {
    beforeEach(() => {
        window.localStorage.removeItem("token");
    });

test("nav element is present", () => {
    render(
        <MemoryRouter>
            <NavBar/>
        </MemoryRouter>
    );

    const nav = screen.getByRole('navigation')
    expect(nav).to.exist;
});

test("renders the home logo", () => {
    render(
        <MemoryRouter>
            <NavBar/>
        </MemoryRouter>
    );

    // Check if the home logo with the emoji is rendered
    const logoElement = screen.getByText("🍉");
    expect(logoElement).to.exist;
    });

test("renders all navigation links", () => {
    render(
    <MemoryRouter>
        <NavBar />
    </MemoryRouter>
    );

    // Check for each navigation link by their text content
    const homeLink = screen.getByText("Home");
    const profileLink = screen.getByText("Profile");
    const friendsLink = screen.getByText("Friends");
    const messagesLink = screen.getByText("Messages");
    const settingsLink = screen.getByText("Settings");

    // Assert that each link is in the document
    expect(homeLink).to.exist;
    expect(profileLink).to.exist;
    expect(friendsLink).to.exist;
    expect(messagesLink).to.exist;
    expect(settingsLink).to.exist;
    });

test("has correct href for each navigation link", () => {
    render(
    <MemoryRouter>
        <NavBar />
    </MemoryRouter>
    );

    expect(screen.getByText("Home").closest("a").getAttribute("href")).to.equal("/posts");
    expect(screen.getByText("Profile").closest("a").getAttribute("href")).to.equal("/profile");
    expect(screen.getByText("Friends").closest("a").getAttribute("href")).to.equal("/friends");
    expect(screen.getByText("Messages").closest("a").getAttribute("href")).to.equal("/messages");
    expect(screen.getByText("Settings").closest("a").getAttribute("href")).to.equal("/settings");
        
    });

test("renders the LogoutButton component", () => {
    render(
    <MemoryRouter>
        <NavBar />
    </MemoryRouter>
    );

    // Check if the LogoutButton component is rendered
    const logoutButton = screen.getByText("Log out");
    expect(logoutButton).to.exist;
    });

test("each link goes to the correct page", async () => {
    render(
        <ProfilePage/>, {wrapper: BrowserRouter}
    );
    const user = userEvent.setup();
    
    await user.click(screen.getByRole('link', { name: /messages/i }));
    expect(await screen.getByText("Messages")).to.exist;

    await user.click(screen.getByRole('link', { name: /profile/i }));
    expect(await screen.getByText("Profile")).to.exist;

    await user.click(screen.getByRole('link', { name: /settings/i }));
    expect(await screen.getByText("Settings")).to.exist;

    await user.click(screen.getByRole('link', { name: /friends/i }));
    expect(await screen.getByText("Friends")).to.exist;

    // I don't know man, it does not want to work its really annoying
    
    // window.localStorage.setItem("token", "testToken");

    // const logoLink = screen.getByRole('link', { name: /posts/i });
    // await user.click(logoLink);
    // screen.debug();

    // expect(await screen.getByText("Posts")).toBeInTheDocument(); 

    });
});
