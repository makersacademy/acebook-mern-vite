import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createPosts } from "../../services/posts";
// import LikeDislike from "../Likes/LikeCounter"
import UploadWidget from './UploadWidget';
import '../../css/CreatePost.css'
import { Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME

 
const CreatePost = (props) => {
    const token = localStorage.getItem("token")
    const [messageField, setMessageField] = useState("")
    const [imageField, setImageField] = useState("")
    const navigate = useNavigate();
    const [error, setError] = useState([])
    const cld = new Cloudinary({cloud: {cloudName: CLOUD_NAME}});
    const [imagePreview, setImagePreview] = useState('')

    const handleMessageChange = (event) => {
        setMessageField(event.target.value)
    }; 

    const handleImageUpload = (imageLocation) => {
        setImageField(imageLocation);
        setImagePreview(cld.image(imageLocation));
        // imagePreview.resize(fill().width(250).height(250));
        console.log(imagePreview)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createPosts(token, messageField, imageField);
            setImageField("");
            setMessageField(""); 
            setImagePreview('')
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
          <label>Tell us what's on your mind!</label>

          <input data-testid="post-message" type='text' value={messageField} onChange={handleMessageChange}></input>
          <UploadWidget folder={'posts'} buttonText = {'Add a photo'} handleImageUpload={handleImageUpload}/>
          {imagePreview && <AdvancedImage style={{ height: "250px", width: "250px", objectFit: "cover"}} cldImg={imagePreview} />}
          {/* <div>{imagePreview}</div> */}
          <input className="post-button" role="submit-button" id="submit" type="submit" value="Submit" />
        </form>
        <div>
        <p>{error}</p>
        </div>
        </div>
        
    )
}

export default CreatePost;