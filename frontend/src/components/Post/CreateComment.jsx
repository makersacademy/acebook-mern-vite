import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createComment } from "../../services/posts";
import '../../css/LoginPageBackground.css'

const CreateComment = (props) => {
    const token = localStorage.getItem("token")
    const [messageField, setMessageField] = useState("")
    const navigate = useNavigate();
    const [error, setError] = useState([])
    const postId = props.postId

    const handleMessageChange = (event) => {
        setMessageField(event.target.value)
    }; 


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createComment(token, postId, messageField);
            setMessageField(""); 
            props.onCreateComment();
        } 
        catch (err) {
            console.error(err);
            setError([err.message])
            navigate("/posts");
        }
    };

    return (
        <div data-testid='create-comment-component'>
        <form onSubmit={handleSubmit}>
        <label>Add your comment:</label>
            <input data-testid="comment-message" type='text' value={messageField} onChange={handleMessageChange}></input>
            <input className="neon-button" role="submit-button" id="submit" type="submit" value="Submit" />
        </form>
        <div>
            <p>{error}</p>
        </div>
        </div>
    )
}

export default CreateComment;