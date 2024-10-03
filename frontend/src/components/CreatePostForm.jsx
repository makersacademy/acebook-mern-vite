import { useState } from "react"
import { createPost } from "../services/posts";


const CreatePostForm = () => {
    
    const [message, setMessage] = useState("");

    const handleMessageChange = (event) => setMessage(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        createPost(message);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="message">Enter message:</label>
            <input 
                type="text"
                name="message"
                value={message}
                onChange={handleMessageChange} 
            />

            <input 
                type="submit"
                value="Submit" 
            />
        </form>
    )
};

export default CreatePostForm;