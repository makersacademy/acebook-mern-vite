import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewPost } from "../../services/posts";




const CreatePost = () => {
    const [message, setMessage] = useState("");
    const [postImage, setPostImage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    
    const navigate = useNavigate();

    const onChange = (e) => {
        if (!e.target.files) {
            return;
        }
        let file = e.target.files[0];
        
        console.log("file to upload:", file)

        if (file) {
            if (file.size > 102400) {
                setErrorMessage("This file is too large. Please choose a file under 102 kb")
            }
            const reader = new FileReader();

            reader.onload = (readerEvt) => {
                let binaryString = readerEvt.target.result
                let b64String = btoa(binaryString)
                setPostImage(b64String)

                const preview = document.getElementById('postImage')
                preview.src = "data:image/png;base64," + b64String

            }

            reader.readAsBinaryString(file);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            
            const responseObject = await createNewPost(message, postImage);
            if (responseObject.message) {
                setErrorMessage(responseObject.message);
            }
            console.log(responseObject.message);
            console.log("creating post...");
            setMessage("");

            navigate(0)
        } catch (err) {
            setMessage("");
            console.log(err);
            navigate(0);
        } 
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };



    return (
        <div className="post-container">
        <form onChange={(e) => onChange(e)} onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="postContent">
                <h3>Create A Post</h3>
                {errorMessage !== "OK" && <p>{errorMessage}</p>}
                <textarea
                    id="postContent"
                    name="postContent"
                    placeholder="Write your post here..."
                    value={message}
                    onChange={handleMessageChange}
                    rows="4"
                    cols="50"
                ></textarea>
                        <br/><input type="file"
                                    name="postImage"
                                    id='fileUpload'
                                    accept='.jpg, .png, .jpeg'
                            /><br/>
                <input type="submit" value="submit" />
            </label>
        </form>
        <img alt="nada" id="postImage" className="preview-image" />
        </div>
    );
    };

export default CreatePost;
