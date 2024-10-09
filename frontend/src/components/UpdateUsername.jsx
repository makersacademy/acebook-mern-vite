import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateUser } from "../services/users";


export function UpdateUsername () {
    const [newUsername, setNewUsername] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const payload = {};
        try {
            payload.newUsername = newUsername;
            UpdateUser(payload);
            navigate('/users/me');
        } catch (err) {
            console.log(err);
            navigate(0);
        }
    }
    function handleNewUsernameChange(event) {
        setNewUsername(event.target.value);
    }
    return (
        <>
        <h2>Change Username
        </h2>
        <form onSubmit={handleSubmit}>
        <label>New Username</label>
        <input type="text" value={newUsername} placeholder="Enter new username" onChange={handleNewUsernameChange} />
        <button
        role="submit-button"
        id="submit"
        type="submit"
        value="Submit"
        >
        Submit
        </button>
        </form>
        </>
    )
}