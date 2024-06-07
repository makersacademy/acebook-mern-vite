import { useLocation, Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

export const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id"); // Retrieve user ID from local storage

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        navigate('/login');  // Redirect to the login page after logging out
    };

    return (
        <nav className="navbar-container">
            {location.pathname !== '/profile' && (
                <h3>
                    <button className="nav-button"><Link to="/profile">Profile</Link></button>
                </h3> 
            )}

            {location.pathname !== '/posts' && location.pathname !== `/edit/${userId}` && (
                <h3>
                    <button className="nav-button"><Link to="/posts">Feed</Link></button>
                </h3>
            )}

            {location.pathname !== `/edit/${userId}` && (
                <button className="nav-button"><Link to={`/edit/${userId}`}>Edit</Link></button>
            )}

            <button className="nav-button" onClick={logOut}>Sign Out</button>
        </nav>
    );
};