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
            getUserById(token, user_id)
                .then((data) => {
                const loggedUser = data.users.filter((user) => user._id == user_id)[0];
                    setUser(loggedUser.fullname);
                localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.error(err);
                    navigate("/login");
                });
        }
    }, [navigate]);

    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
        return;
    }

    return (
        <>
            <h2>{user}</h2>
        </>
    );
};
