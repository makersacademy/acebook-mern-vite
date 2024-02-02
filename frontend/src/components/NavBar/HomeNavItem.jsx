import { useNavigate } from "react-router-dom";

export default function HomeNavItem() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
    }

    return (
        <button
        type="button"
        id="home-nav-button"
        onClick={handleClick}
        >
            Home
        </button>


    )

}