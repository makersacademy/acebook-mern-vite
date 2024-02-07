import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { updateComment } from "../../services/comments";

const EditComment = (props) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState(props.message);
    const commentId = props.comment._id;
    const [inputField, setInputField] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const handleUpdate = (event) => {
        event.preventDefault();
        if (message === "") {
            setErrorMessage("Comment cannot be blank")
        } else {
            updateComment(commentId, message, token)
                .then((data) => {
                    setToken(data.token);
                    window.localStorage.setItem("token", data.token);
                    console.log("Comment Updated");
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

    const editCommentForm = 
        <form onSubmit={handleUpdate}>
            <label htmlFor="commentContent">
                <textarea
                    id="commentContent"
                    name="commentContent"
                    value={message}
                    placeholder="Update Comment Here"
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
            {inputField && editCommentForm}
            <button onClick = {handleEdit} className="editComment" name="edit">
                {!inputField ? "Edit" : "Discard Changes"}
            </button>

        </>
    );
};

export default EditComment;
