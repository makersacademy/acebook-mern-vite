import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateUser } from "../services/users";


export function UpdateEmail () {
    const [newEmail, setNewEmail] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) { // Potentially add email validation? Does React/Bootstrap do this?
        event.preventDefault();
        const payload = {};
        try {
            payload.newEmail = newEmail;
            UpdateUser(payload);
            navigate('/users/me');
        } catch (err) {
            console.log(err);
            navigate(0);
        }
    }
    function handleNewEmailChange(event) {
        setNewEmail(event.target.value);
    }
    return (
        <>
        <h2>Change Email
        </h2>
        <form onSubmit={handleSubmit}>
        <label>New Email</label>
        <input type="email" value={newEmail} placeholder="Enter new Email" onChange={handleNewEmailChange} />
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