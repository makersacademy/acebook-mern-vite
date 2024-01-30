import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../services/user";

export const UserPage = () => {
    const [user, setUser] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            getUser(token)
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
        });
    
        if (!token) {
            return;
        }
        
        return (
            <>
            <h1>testuser</h1>
            </>
        );

};