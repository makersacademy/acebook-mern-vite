import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../services/users";

export const ProfilePage = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const { user_id } = useParams();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        // const user_id = localStorage.getItem("user_id");
        if (token) {
            getUserById(token, user_id)
                .then((data) => {
                const foundUser = data.user;
                    setUser(foundUser);
                localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.error(err);
                    navigate("/login");
                });
        }
    }, [navigate, user]);

    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
        return;
    }

    return (
        <>
            <p>Email: {user.email}</p>
            <p>Full Name: {user.fullname}</p>
        </>
    );
};
