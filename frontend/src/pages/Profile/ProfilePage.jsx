import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../services/Profile";
import Profile from "../../components/Profile/Profile";


export const ProfilePage = () => {
    const [profile, setProfile] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            getProfile(token)
                .then((data) => {
                    setProfile(data.users);
                    setToken(data.token);
                    window.localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.err(err);
                });
        } else {
            navigate("/login");
        }
    });


    if (!token) {
        return;
    }

    return (
        <>
            <h2>Users</h2>
            <div className="profile" role="profile">
                {profile.map((user) => (
                    <Profile user={user} key={user._id} />
                ))}
            </div>
        </>
    );
                };

                