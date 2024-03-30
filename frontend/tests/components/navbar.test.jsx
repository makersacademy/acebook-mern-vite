import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../../src/components/Post/Navbar";
import "@testing-library/jest-dom";

describe('Navbar component', () => {
    test('renders Navbar component with links', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        // Assert that links are rendered
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('My profile')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    
    test('Logout link takes you to the Login page', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        // Find the Logout link
        const logoutLink = screen.getByText('Logout');

        // Click on the Logout link
        fireEvent.click(logoutLink);

        // Assert that the browser navigates to the login page
        expect(screen.getByText("Login")).toBeInTheDocument();
    });
    
    // test('Home link takes you to the FeedPage', () => {
    //     render(
    //         <MemoryRouter>
    //             <Navbar />
    //         </MemoryRouter>
    //     );

    //     // Find the Home link
    //     const homeLink = screen.getByText('Home');

    //     // Click on the Home link
    //     fireEvent.click(homeLink);

    //     // Debug information
    //     console.log('Current pathname:', window.location.pathname);

    //     // Assert that the browser navigates to the FeedPage
    //     expect(window.location.pathname).toBe('/posts');
    // });

    // test('calls logout function when Logout link is clicked', () => {
    //     const mockRemoveItem = jest.spyOn(localStorage, 'removeItem');
    
    //     render(
    //         <MemoryRouter>
    //             <Navbar />
    //         </MemoryRouter>
    //     );
    //     // Click Logout link
    //     fireEvent.click(screen.getByText('Logout'));
    //     // Assert that logout function is called
    //     expect(mockRemoveItem).toHaveBeenCalledWith('token');
    // });
});
