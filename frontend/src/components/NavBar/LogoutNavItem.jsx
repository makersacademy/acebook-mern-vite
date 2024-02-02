import { useNavigate } from "react-router-dom";

export default function LogoutNavItem() {
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.clear();
        navigate("/login")
    }

    return (
        <button
        type="button"
        onClick={handleClick}
        >
            Logout
        </button>
    )

}