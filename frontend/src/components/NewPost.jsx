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
        const trimmedPost = postContent;
        const maxLength = 250;

        if (trimmedPost === '') {
            alert('Post content cannot be empty.');
            return;
        }
        if (trimmedPost.length > maxLength) {
            alert(`Post cannot exceed ${maxLength} characters.`);
            return;
        }
        const token = localStorage.getItem('token');
        console.log(postContent)
        await createPost(token, postContent);
        clearPostContent();
        handleReloadPosts();
    }
    return(
        <>
        <div className="post-card">
                <label htmlFor="postContent">Enter Post Content</label>
                <input type="text" id="postContent" name="postContent" value={postContent} onChange={handlePostContent}></input>
                <button className="submit-button" type="button" onClick={submitContent}>Submit Post</button>
                </div>
        </>
    )
}