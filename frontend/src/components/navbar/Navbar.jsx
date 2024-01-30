import { Link } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
    return (
        <nav className="navbar">
        <div>
            <ul className="nav-links">
                <li><Link to='/'>Homepage</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/signup'>Sign Up</Link></li>
                <li><Link to='/posts'>Feed</Link></li>
            </ul>
        </div>
        </nav>
    );
}

export default Navbar;