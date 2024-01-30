import { useNavigate } from "react-router-dom";
import logo from "../../assets/acebook.svg"
import "./Navbar.css"
// import TextField from "@mui/material/TextField";

const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        window.localStorage.removeItem("token");
        navigate("/login")
    }

    const profilePage = () => {
        navigate("/profile")
    }

    const home = () => {
        navigate("/posts")
    }

    return (
        <nav>
            <img src={logo} alt="Acebook Logo" className="logo" onClick={home}/>
            <p>Acebook</p>
            <div>
            <button onClick={profilePage}>Profile</button>
            <button onClick={logout}>Logout</button>
            <button onClick={home}>Home</button>
            </div>
            <input type="text" placeholder="Search.."></input>
        </nav>
    );

};


export default Navbar;



{/* <TextField
            id="outline-basic"
            variant="outlined"
            fullWidth
            label="Search"/> */}