import { Link } from "react-router-dom";
import "./Navbar.css"


const Navbar = () => {

    function handleClick() {
        //alert('hello')
        window.localStorage.clear();
    }

    function handleClick2() {
        console.log(window.localStorage("token"));
    }

    return (
        <nav className="navbar">
        <div>
            <ul className="nav-links">
                <li><Link to='/'>Homepage</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/signup'>Sign Up</Link></li>
                <li><Link to='/posts'>Feed</Link></li>
                <li><Link to='/profile' onClick={handleClick2}>My Profile</Link></li>
                <li><Link to='/' onClick={handleClick}>Logout</Link></li>
            </ul>
        </div>
        </nav>
    );
}

export default Navbar;