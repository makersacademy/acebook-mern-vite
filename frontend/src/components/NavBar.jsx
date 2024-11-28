import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import placeholderLogo from "../assets/placeholder_logo.png";
import "./NavBar.css"
export function NavBar() {


    return(
        <>
        <nav className="navbar">
            <img width="70rem" height="70rem" src={placeholderLogo}></img>
            <Link className="nav-link" to="/profile">Profile</Link>
            <Link className="nav-link" to="/posts">Feed</Link>
            <LogoutButton/>
        </nav>
        </>
    );
}