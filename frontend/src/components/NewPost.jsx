import { useState} from "react";
import { createPost } from "../services/posts";

export function NewPost() {
const [postContent, setPostContent] = useState('');

    const handlePostContent = (event) => {
        setPostContent(event.target.value);
        console.log(postContent);
    }
    const submitContent = async () => {
        const token = localStorage.getItem('token');
        await createPost(token,postContent);
        window.location.reload();
        // "Quick dirty fix" ^
    }
    return(
        <>
            <form>
                <label htmlFor="postContent">Enter Post Content</label>
                <input type="text" id="postContent" name="postContent" value={postContent} onChange={handlePostContent}></input>
                <button type="submit" onClick={submitContent}>Submit Post</button>
            </form>
        </>
    )
}