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
        <div data-testid=' create-comment-component '>
          <form onSubmit={handleSubmit} className="mb-2">
            <div className="form-group">
              <label htmlFor="comment-message" className="mb-1 mt-2">Add your comment:</label>
              <textarea
                id="comment-message"
                className="form-control"
                type='text'
                value={messageField}
                onChange={handleMessageChange}
              />
            </div>
            <button className="neon-button mt-3" type="submit">Comment</button>
          </form>
          <div>
            <p>{error}</p>
          </div>
        </div>
      );
      
}

export default CreateComment;