import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateUser } from "../services/users";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


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
<Form onSubmit={handleSubmit}>
<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Change Email address</Form.Label>
<Form.Control
type="email"
value={newEmail}
placeholder="Enter email"
onChange={handleNewEmailChange}
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
    )}



