import { Link } from "react-router-dom";
import "./Navbar.css"


const Navbar = () => {

    function handleClick1() {
        //alert('hello')
        console.log(window.localStorage)
        window.localStorage.removeItem('token')
        console.log(window.localStorage)
    }

    function handleClick2() {
        //alert('hello')
        console.log(window.localStorage)

    }

    return (
        <nav className="navbar">
        <div>
            <ul className="nav-links">
                <li><Link to='/'>Homepage</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/signup'>Sign Up</Link></li>
                <li><Link to='/posts' onClick={handleClick2}>Feed</Link></li>
                <li><Link to='/profile' onClick={handleClick2}>My Profile</Link></li>
                <li><Link to='/' onClick={handleClick1}>Logout</Link></li>
            </ul>
        </div>
        </nav>
    );
}

export default Navbar;