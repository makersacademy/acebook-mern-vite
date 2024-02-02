import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewPost } from "../../services/posts";



const CreatePost = () => {
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const responseObject = await createNewPost(message);
            if (responseObject.message) {
                setErrorMessage(responseObject.message);
            }
            console.log(responseObject.message);
            console.log("creating post...");
            setMessage("");
            navigate(0)
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
            <label htmlFor="postContent">
                <h3>Create A Post</h3>
                {errorMessage !== "OK" && <p>{errorMessage}</p>}
                <textarea
                    id="postContent"
                    name="postContent"
                    placeholder="Write your post here..."
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

export default CreatePost;
