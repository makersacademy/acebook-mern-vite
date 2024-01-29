import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        window.localStorage.removeItem("token");
        navigate("/login")
    }

    return (
        <nav>
            <p>Acebook</p>
            <button>Profile</button>
            <button onClick={logout}>Logout</button>
        </nav>
    )
}

export default Navbar;