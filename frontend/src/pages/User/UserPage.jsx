import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../services/user";
import User from "../../components/User/User";
import EditUserModal from "../../components/EditUserModal/EditUserModal";



export const UserPage = () => {
    const [user, setUser] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [email, setEmail] = useState(window.localStorage.getItem("email"));
    const navigate = useNavigate();
    const { username } = useParams();


    useEffect(() => {
        if (token) {
            getUser(token, username)
                .then((data) => {
                    setUser(data.user);
                    setToken(data.token);
                    window.localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.err(err);
                });
            } else {
            navigate("/login");
            }
        }, []);
    
        if (!token) {
            navigate("/login")
        }
        
        if (user.length === 0) {
            return(
                <>
                <h1>User not found</h1>
                </>
            )
        }

        return (
            <>
            <h1>User Page</h1>


            {email === user.email ? 

            <EditUserModal 
            username={username}
            image={user.image}
            />

            : <p>no</p>}

            <User 
                key={user._id}
                username={user.username}
                email={user.email}
                bio={user.bio}
                friends={user.friends}
                image={user.image}
                
            
            />
            
            </>
        );

};