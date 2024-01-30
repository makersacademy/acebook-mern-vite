import { useNavigate } from "react-router-dom";
import logo from "../../assets/acebook.svg"

const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        window.localStorage.removeItem("token");
        navigate("/login")
    }

    return (
        <nav>
            <img src={logo} alt="Acebook Logo" className="logo"/>
            <p>Acebook</p>
            <button>Profile</button>
            <button onClick={logout}>Logout</button>
        </nav>
    )
}

export default Navbar;