import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createPosts } from "../../services/posts";
// import LikeDislike from "../Likes/LikeCounter"
import UploadWidget from './UploadWidget';
import '../../css/CreatePost.css'
 
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
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title text-center mb-4">Create Post</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group ">
                      <label htmlFor="post-message">Tell us what's on your mind!</label>
                      <textarea
                        id="post-message"
                        className="form-control custom-input"
                        type="text"
                        value={messageField}
                        onChange={handleMessageChange}
                      />
                    </div>
                    <div className="form-group">
                      <UploadWidget folder={'posts'} buttonText={'Add a photo'} handleImageUpload={handleImageUpload}/>
                    </div>
                    <button className="post-btn mt-3" type="submit">Post</button>
                  </form>
                  {error.length > 0 && (
                      <div style={{ color: 'white', marginTop: '0.5rem' }}>
                        {error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
}

export default CreatePost;