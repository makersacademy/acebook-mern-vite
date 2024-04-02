import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createPosts } from "../../services/posts";

 
const CreatePost = (props) => {
    const token = localStorage.getItem("token")
    const [messageField, setMessageField] = useState("")
    const navigate = useNavigate();
    const [error, setError] = useState([])

    const handleMessageChange = (event) => {
        setMessageField(event.target.value)
    }; 

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createPosts(token, messageField);
            setMessageField(""); 
            props.onCreatePost();
        } catch (err) {
            console.error(err);
            setError([err.message])
            navigate("/posts");
        }
    };

    return (
        <div data-testid='create-post-component'>
        <form onSubmit={handleSubmit}>
        <label>Create your post!</label>
                                                                        
        <input data-testid="post-message" type='text' value={messageField} onChange={handleMessageChange}></input>
        <input role="submit-button" id="submit" type="submit" value="Submit" />
        </form>
        <div>
         <p>{error}</p>
        </div>
        </div>
    )
}

export default CreatePost;