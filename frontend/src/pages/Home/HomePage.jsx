import { Link } from "react-router-dom";
import "./HomePage.css";
import Navbar from "../../components/NavBar/navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            // console.log(token)
            navigate("/posts");
        }
    }, [token, navigate]);

    return (
        <>
            <Navbar />
            <div className="home">
                <h1>Welcome to Acebook!</h1>
                <a href="/signup">
                    <button id="sign-up-button" type="button">
                        Sign up
                    </button>
                </a>
                <a href="/login">
                    <button id="log-in-button" type="button">
                        Log in
                    </button>
                </a>
            </div>
        </>
    );
};
