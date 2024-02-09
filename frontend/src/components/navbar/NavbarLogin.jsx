import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css"
import logo from "../../assets/logo.jpg"


const NavbarLoggedIn = () => {
    const navigate = useNavigate();

    function handleClick() {
        //alert('hello')
        window.localStorage.clear()
        navigate('/');
        navigate(0);
    }

    function handleClick2() {
        console.log(window.localStorage("token"));
    }

    return (
        <nav className="navbar">
        <div>
            <ul className="nav-links">
            <img src={logo} className="navLogo" />
                <li><Link to='/'>Homepage</Link></li>
                <li><Link to='/posts'>Feed</Link></li>
                <li><Link to='/profile' onClick={handleClick2}>My Profile</Link></li>
                <li><Link to='/' onClick={handleClick}>Logout</Link></li>
            </ul>
        </div>
        </nav>
    );
}

export default NavbarLoggedIn;