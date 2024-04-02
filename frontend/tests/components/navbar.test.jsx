import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../../src/components/Post/Navbar";
import "@testing-library/jest-dom";

vi.mock("react-router-dom", () => {
    const navigateMock = vi.fn(); // mocks the behaviour of the navigate function provided by useNavigate
    const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
    const MemoryRouterMock = ({ children }) => children; // Mock MemoryRouter component
    const BrowserRouterMock = ({ children }) => children; // Mock BrowserRouter component
    const LinkMock = ({ children }) => children; // Mock Link component
    return { useNavigate: useNavigateMock, MemoryRouter: MemoryRouterMock, BrowserRouter: BrowserRouterMock, Link: LinkMock };
});

describe('Navbar component', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });
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

    
//     test('Logout link takes you to the Login page', () => {
//         render(
//             <MemoryRouter>
//                 <Navbar />
//             </MemoryRouter>
//         );

//         // Find the Logout link
//         const logoutLink = screen.getByText('Logout');

//         // Click on the Logout link
//         fireEvent.click(logoutLink);

//         // Assert that the browser navigates to the login page
//         expect(screen.getByText("Login")).toBeInTheDocument();
//     });

//     test("navigates to /login on successful logout", async () => {
//         render(<FeedPage />);
//         render(
//             <MemoryRouter>
//                 <Navbar />
//             </MemoryRouter>
//         );
    
//         const navigateMock = useNavigate();
//         const logoutButton = screen.getByText('Logout');
//         fireEvent.click(logoutButton);
    
//         expect(navigateMock).toHaveBeenCalledWith("/login"); // Check if useNavigate is called with the correct path
//     });
// });