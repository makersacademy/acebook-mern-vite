import { useState } from 'react';
import { createPost } from '../../services/posts'
import './NewPost.css'


const NewPost = ( {token, userId, toggleStateChange} ) => {
    const [postMessage, setPostMessage] = useState('');
    const [file, setFile] = useState(null)
    const [uploadImage, setuploadImage] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()

        const formData = new FormData();
        if(file){
            formData.append('file', file)
        } else {
            if(!postMessage) {
                return alert("cannot post empty comment")
            }
        }
        if(postMessage){
            
            formData.append('postMessage', postMessage)
        }
        formData.append("userId", userId)

        createPost(token, formData)
            .then(res => {
                console.log(res)
                setPostMessage('')
                setFile(null)
                setErrorMessage('')
                setuploadImage(false)
                toggleStateChange()

            })
            .catch(error => {
                console.log('error submitting post', error)
            })   
    }

    const handleUploadImageClick = () => {
        setuploadImage(!uploadImage)
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    
    return (
        <div className="new-post-container">
            <form onSubmit={handleSubmit}>
                <div className="text-area-container">
                    <textarea
                        className="new-post-text-area"
                        name="text"
                        value = {postMessage}
                        onChange={(message) => setPostMessage(message.target.value)}
                    >
                    </textarea>
                </div>

                <div className="image-button-container">
                    <button type="button" onClick={handleUploadImageClick}>
                        <i className="fa-solid fa-image"></i>
                    </button>
                </div>

                {uploadImage &&  
                    <>
                    <input 
                        type="file" 
                        name="file"
                        accept="image/png, image/jpeg" 
                        onChange={handleFileChange}
                    />
                    </>
                }
                <div className="post-button-container">
                    <button type='submit' className="post-button">Post</button>
                </div>
                {errorMessage && errorMessage}
            </form>
        </div>
    )


};

export default NewPost;