import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updatePost } from "../../services/posts";

const EditPost = (props) => {
    const navigate = useNavigate();
    const handle = useParams();
    const [message, setMessage] = useState(props.message);
    const postId = handle.id;
    const [inputField, setInputField] = useState(false)
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const handleUpdate = (event) => {
        event.preventDefault();
            updatePost(postId, message, token)
                .then((data) => {
                    setToken(data.token);
                    window.localStorage.setItem("token", data.token);
                    console.log("Post Updated");
                    navigate(0);
                })
                .catch((err) => {
                    console.log(err);
                });
        } 

    const handleEdit = () => {
        setInputField(!inputField)
        setMessage(props.message)
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const editPostForm = 
        <form onSubmit={handleUpdate}>
            <label htmlFor="postContent">
                {/* {errorMessage !== "OK" && <p>{errorMessage}</p>} */}
                <textarea
                    id="postContent"
                    name="postContent"
                    value={message}
                    onChange={handleMessageChange}
                    rows="4"
                    cols="50"
                ></textarea>
                <br></br>
                <input type="submit" value="Save Changes" />
            </label>
        </form>

    return (
        <>
            {inputField && editPostForm}
            <button onClick = {handleEdit} className="editPost" name="edit">
                {!inputField ? "Edit" : "Discard Changes"}
            </button>

        </>
    );
};

export default EditPost;
