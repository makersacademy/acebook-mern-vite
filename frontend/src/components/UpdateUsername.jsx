import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateUser } from "../services/users";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


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
<Form onSubmit={handleSubmit}>
<Form.Group className="mb-3" controlId="formBasicUsername">
<Form.Label>Change Username address</Form.Label>
<Form.Control
type="text"
value={newUsername}
placeholder="Enter Username"
onChange={handleNewUsernameChange}
/>
</Form.Group>
<Button
        role="submit-button"
        id="submit"
        variant="primary"
        type="submit"
        value="Submit"
        >
        Submit
        </Button>
    </Form>
    </>
    )
}