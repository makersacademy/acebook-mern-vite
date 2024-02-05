import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createComment } from "../../services/comments";

const CreateComment = (prop) => {
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const responseObject = await createComment(message, prop.postID);
            if (responseObject.message) {
                setErrorMessage(responseObject.message);
            }
            console.log(responseObject.message);
            console.log("creating comment...");
            setMessage("");
            navigate(0);
        } catch (err) {
            setMessage("");
            console.log(err);
            navigate(0);
        }
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="commentContent">
                <h3>Create A Comment</h3>
                {errorMessage !== "OK" && <p>{errorMessage}</p>}
                <textarea
                    id="commentContent"
                    name="commentContent"
                    placeholder="Write your comment here..."
                    value={message}
                    onChange={handleMessageChange}
                    rows="4"
                    cols="50"
                ></textarea>
                <br></br>
                <input type="submit" value="submit" />
            </label>
        </form>
    );
};

export default CreateComment;
