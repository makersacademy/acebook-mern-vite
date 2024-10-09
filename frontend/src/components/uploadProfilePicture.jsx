import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { updateProfilePic } from "../services/users";
import Button from "react-bootstrap/esm/Button";


export function UploadProfilePic () {
    const [imgURL, setimgURL] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            updateProfilePic(imgURL);
            navigate(0);
        } catch (err) {
            console.log(err);
            navigate('/createpost');
        }
    }
    function handleImgURLChange(event) {
        setimgURL(event.target.value);
    }
    return (
        <>
        <h2>Update Profile Picture
        </h2>
        <form onSubmit={handleSubmit}>
        <label>Image URL</label>
        <input type="text" value={imgURL} placeholder="Enter Image URL" onChange={handleImgURLChange} />
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