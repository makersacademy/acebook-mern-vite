import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../services/users";

export const ProfilePage = () => {
    const [user, setUser] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");
        if (token) {
            getUserById(user_id)
                .then((data) => {
                setUser(data.user_id);
                })
                .catch((err) => {
                console.error(err);
                navigate("/login");
                });
        }
    }, [navigate]);

    return (
        <>
            <h2>{user}</h2>
        </>
    );
};
