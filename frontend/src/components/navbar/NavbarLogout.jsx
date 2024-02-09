import { Link } from "react-router-dom";
import "./Navbar.css"
import logo from "../../assets/logo.jpg"


const Navbar = () => {


    return (
        <nav className="navbar">
        <div>
            <ul className="nav-links">
            <img src={logo} className="navLogo" />
                <li><Link to='/'>Homepage</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/signup'>Sign Up</Link></li>
            </ul>
        </div>
        </nav>
    );
}

export default Navbar;