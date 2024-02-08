import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authentication";
import Navbar from "../../components/NavBar/navbar";
import "./SignupPage.css";

export const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const defaultUserImage = "kangaroo-face.png"

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signup(username, email, password, defaultUserImage);
            // Set the signup success flag in local storage
            localStorage.setItem("signupSuccess", "true");
            navigate("/login");
        } catch (err) {
            console.error(err);
            navigate("/signup");
            alert(err);
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <>
            <Navbar />
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username"></label>
                <input
                    id="username"
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                />

                <label htmlFor="email"></label>
                <input
                    id="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                />

                <label htmlFor="password"></label>
                <input
                    placeholder="Password"
                    id="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <input
                    role="submit-button"
                    id="submit"
                    type="submit"
                    value="Submit"
                />
            </form>
        </>
    );
};
