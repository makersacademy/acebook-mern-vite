import { useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProfile } from "../../services/Profile";
import Profile from "../../components/Profile/Profile";
import ProfileEdits from "../../components/Profile/ProfileEdits";


export const ProfileEditsPage = () => {
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
                    navigate("/profile")
                });
        } else {
            navigate("/profileEdits");
        }
    },[]);


    if (!token) {
        return;
    }

    return (
        <>
            <h2>Edit Profile</h2>
            <div className="profileEdits" role="profileEdits">
                {profile.map((user) => (
                    <>
                        <ProfileEdits user={user} key={user._id} />
                        <ul className="profile-edits">
                            <Link to='/profile'>Cancel Edit Profile</Link>
                        </ul>
                    </>
                ))}
            </div>
        </>
    );
                };