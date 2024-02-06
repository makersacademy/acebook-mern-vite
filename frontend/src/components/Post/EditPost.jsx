import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updatePost } from "../../services/posts";

const EditPost = (props) => {
    const navigate = useNavigate();
    const handle = useParams();
    const [message, setMessage] = useState(props.message);
    const postId = handle.id;
    const [inputField, setInputField] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const handleUpdate = (event) => {
        event.preventDefault();
        if (message === "") {
            setErrorMessage("Post cannot be blank")
        } else {
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
        } 

    const handleEdit = () => {
        setErrorMessage("")
        setInputField(!inputField)
        setMessage(props.message)
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const editPostForm = 
        <form onSubmit={handleUpdate}>
            <label htmlFor="postContent">
                <textarea
                    id="postContent"
                    name="postContent"
                    value={message}
                    placeholder="Update Post Here"
                    onChange={handleMessageChange}
                    rows="4"
                    cols="50"
                ></textarea>
                {errorMessage && <p>{errorMessage}</p>}
                <br></br>
                <input type="submit" value="Save Changes" role="button" name="Save Changes" />
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
