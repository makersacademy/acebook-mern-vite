import { useNavigate } from "react-router-dom";
import logo from "../../assets/acebook.svg"
import "./Navbar.css"
// import TextField from "@mui/material/TextField";

const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        window.localStorage.removeItem("token");
        navigate("/")
    }

    const profilePage = () => {
        navigate("/profile")
    }

    const home = () => {
        navigate("/posts")
    }

    const settingsPage = () => {
        navigate("/settings")
    }

    return (
        <nav>
            <div onClick={home} className="logoAndText">
                <img src={logo} alt="Acebook Logo" className="logo" />
                <p>Acebook</p>
            </div>
            
            <div className="pageButtons">
                <button onClick={home}>Home</button>
                <button onClick={profilePage}>Profile</button>
                <button onClick={settingsPage}>Settings</button>
                <button onClick={logout}>Logout</button>
            </div>
            <input type="text" placeholder="Search.."></input>
        </nav>
    );

};


export default Navbar;

