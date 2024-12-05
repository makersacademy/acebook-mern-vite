import { useState} from "react";
import { editPost } from "../services/posts";

export function EditPost({ handleReloadPosts , message, postId, handleStartEditing }) {
    console.log('THERE:::: ----v')
    console.log(handleReloadPosts)
    const [postContent, setPostContent] = useState(message);

    const handlePostContent = (event) => {
        setPostContent(event.target.value);
    }

    // const clearPostContent = () => {
    //     setPostContent("")
    // }
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
        console.log('...'+ handleReloadPosts);
        await editPost(token, postContent, postId)
        handleStartEditing();
        handleReloadPosts();
        
    }
    return(
        <>
                <label htmlFor="postContent">Enter Updated Post Content</label>
                <input type="text" id="postContent" name="postContent" value={postContent} onChange={handlePostContent}></input>
                <button type="button" onClick={submitContent}>Submit Edit</button>
        </>
    )
}