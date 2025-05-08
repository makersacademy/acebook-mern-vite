import { useState} from "react";
import { createPost } from "../services/posts";

export function NewPost({ handleReloadPosts }) {
const [postContent, setPostContent] = useState('');

    const handlePostContent = (event) => {
        setPostContent(event.target.value);
    }

    const clearPostContent = () => {
        setPostContent("")
    }
    const submitContent = async () => {
        const token = localStorage.getItem('token');
        await createPost(token, postContent);
        clearPostContent();
        handleReloadPosts();
    }
    return(
        <>
                <label htmlFor="postContent">Enter Post Content</label>
                <input type="text" id="postContent" name="postContent" value={postContent} onChange={handlePostContent}></input>
                <button type="button" onClick={submitContent}>Submit Post</button>
        </>
    )
}