import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <div>
            <li>
                <Link to='/'>Homepage</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li>
                <Link to='/signup'>Sign Up</Link>
            </li>
            <li>
                <Link to='/posts'>Feed</Link>
            </li>
        </div>
    );
}

export default Navbar;