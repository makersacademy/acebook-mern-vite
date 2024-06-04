import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../services/users";
import { ProfileUpdate } from "../../components/Profile/ProfileUpdate";

export const ProfilePage = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const profile_id = useParams();
    const user_id = localStorage.getItem("user_id");
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getUserById(token, profile_id.user_id)
                .then((data) => {
                    setUser(data.user);
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
            <h2>{user.fullName}</h2>
            <p>Email: {user.email}</p>
            {user_id == profile_id && <ProfileUpdate profile={user} />}
        </>
    );
};
