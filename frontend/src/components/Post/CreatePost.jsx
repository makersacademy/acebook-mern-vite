import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createPosts } from "../../services/posts";
import LikeDislike from "../Likes/LikeCounter"
import UploadWidget from './UploadWidget';
 
const CreatePost = (props) => {
    const token = localStorage.getItem("token")
    const [messageField, setMessageField] = useState("")
    const [imageField, setImageField] = useState("")
    const navigate = useNavigate();
    const [error, setError] = useState([])

    const handleMessageChange = (event) => {
        setMessageField(event.target.value)
    }; 

    const handleImageUpload = (imageLocation) => {
        console.log('IM IN HANDLE IMAGE UPLOAD')
        setImageField(imageLocation)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createPosts(token, messageField, imageField);
            setImageField("");
            setMessageField(""); 
            props.onCreatePost();
        } 
        catch (err) {
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
          <UploadWidget folder={'posts'} buttonText = {'Add a photo'} handleImageUpload={handleImageUpload}/>
          <input role="submit-button" id="submit" type="submit" value="Submit" />
        </form>
        <div>
        <p>{error}</p>
        </div>
        </div>
        
    )
}

export default CreatePost;