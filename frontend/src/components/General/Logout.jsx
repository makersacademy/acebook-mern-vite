
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
        <button onClick={handleLogout}>LOGOUT</button>
    )
}

export default Logout;