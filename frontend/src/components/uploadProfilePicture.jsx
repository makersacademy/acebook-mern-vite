import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateUser } from "../services/users";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";

export function UploadProfilePic () {
    const [imgURL, setimgURL] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const payload = {};
        try {
            payload.imgURL  = imgURL;
            UpdateUser(payload);
            navigate('/users/me');
        } catch (err) {
            console.log(err);
            navigate(0);
        }
    }
    function handleImgURLChange(event) {
        setimgURL(event.target.value);
    }
    return (
        <>
<Form onSubmit={handleSubmit}>
<Form.Group className="mb-3" controlId="formBasicUsername">
<Form.Label>Change Profile Picture</Form.Label>
<Form.Control
type="text"
value={imgURL}
placeholder="Enter image URL"
onChange={handleImgURLChange}
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