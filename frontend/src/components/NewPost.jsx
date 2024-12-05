import { useState, useRef } from "react";
import { createPost } from "../services/posts";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function NewPost({ handleReloadPosts }) {
const [postContent, setPostContent] = useState('');
const [photo, setPhoto] = useState(null);
const fileInputRef = useRef(null);

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
        await createPost(token, postContent)
        .then((data) => {
            submitPhoto(data.message_id);
            clearPostContent();
            console.log("HANDLE RELOAD POSTS", handleReloadPosts)
            setPhoto(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Reset the file input value
            }
            handleReloadPosts();
        })

    }

    const submitPhoto = async (post_id, e) => {
        // e.preventDefault();
        console.log("submitting photo");
    
        // setShowDefaultImage(false);
    
        const formData = new FormData();
        formData.append("photo", photo);
    
        const token = localStorage.getItem("token");
        // eslint-disable-next-line no-unused-vars
        const result = await axios.post(`${BACKEND_URL}/posts/${post_id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        
      };
  
      const onInputChange = (e) => {
        console.log(e.target.files[0]);
        setPhoto(e.target.files[0]);
      };


    return(
        <>
        <label htmlFor="postContent">Enter Post Content</label>
        <input type="text" id="postContent" name="postContent" value={postContent} onChange={handlePostContent}></input>
        <form onSubmit={submitPhoto}>
            <label htmlFor="image">Upload Photo</label>
            <input
                id="image"
                type="file"
                accept="image/*"
                //   value={photo ? photo : ""}
                onChange={onInputChange}
                ref={fileInputRef}
        /></form>
        <button type="button" onClick={submitContent}>Submit Post</button>
        </>

    )
}