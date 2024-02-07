import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProfile } from "../../services/Profile";
import Profile from "../../components/Profile/Profile";
import ProfileEdits from "../../components/Profile/ProfileEdits";


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
                    window.localStorage.setItem("token", data.token)
                    // testing to working out why test didn't work
                    //console.log(`console log data: ${data.users}`);

                })
                .catch((err) => {
                    console.error(err);
                    navigate("/login")
                });
        } else {
            navigate("/login");
        }
    },[]);


    if (!token) {
        return;
    }

    return (
        <>
            <h2>Users</h2>
            <div className="profile" role="profile">
                {profile.map((user) => (
                    <>
                        <Profile user={user} key={user._id} />
                    </>
                ))}
            </div>
            <div className="friends">
                <Link to ='/addfriends'>Add Friends</Link>
            </div>
            <div className="profile-edits">
                    <Link to='/profileEdits'>Edit Profile</Link>
                </div>
        </>
    );
                };
