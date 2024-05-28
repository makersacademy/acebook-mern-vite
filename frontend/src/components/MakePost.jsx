import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MakePost = () => {
        
    const [newPost, setNewPost] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const token = await makePost(newPost);
        localStorage.setItem("token", token);
        navigate("/posts");
        } catch (err) {
        console.error(err);
        navigate("/login");
        }
    };

    
    return <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor = "new-post">
                Write a post!
                </label>
                <textarea id="new-post" value = "new-post"></textarea>
                <input type="submit"/>
            </form>
        </div>
}

export default MakePost;