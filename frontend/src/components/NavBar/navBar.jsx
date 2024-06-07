import { useLocation, Link } from 'react-router-dom';
import './NavBar.css';
export const NavBar = () => {
    
    const location = useLocation();

    const logOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")
    }

    return (
        <nav className="navbar-container">
            {location.pathname !== '/profile' && (
                <h3>
                    <button className="nav-button"><Link to="/profile">Profile</Link></button>
                </h3> 
            )}

            {location.pathname !== '/posts' && (
                location.pathname !== '/editPage' && 
                <h3>
                    <button className="nav-button"><Link to="/posts">Feed</Link></button>
                </h3> 
            )}
            <button className="nav-button" onClick={()=>logOut()}><Link to ="/Login">Signout</Link></button>
        </nav>
    );
}


