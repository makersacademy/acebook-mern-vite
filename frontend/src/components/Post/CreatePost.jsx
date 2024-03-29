import React, { useState } from "react";

const CreatePost = ({ onPostCreated }) => {
    const [newPost, setNewPost] = useState("");
    const [image, setImage] = useState(null);

    const handleChange = (event) => {
        setNewPost(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("message", newPost);
        formData.append("image", image);

        fetch("/api/posts", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(newPost => {
            onPostCreated(newPost);
            setNewPost("");
            setImage(null);
        })
        .catch(error => {
            console.error("Error creating post:", error);
        });
    };

    return (
        <div>
            <input
                type="text"
                value={newPost}
                onChange={handleChange}
                placeholder="Type your post message here"
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
            <button onClick={handleSubmit}>Create Post</button>
        </div>
    );
}

export default CreatePost;