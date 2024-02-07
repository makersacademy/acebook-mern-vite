import { useState } from 'react';
import { createPost } from '../../services/posts'
import './NewPost.css'


const NewPost = ( {token, userId, toggleStateChange} ) => {
    const [postMessage, setPostMessage] = useState('');
    const [file, setFile] = useState()
    const [uploadImage, setuploadImage] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()

        const formData = new FormData();
        if(file){
            formData.append('file', file)
        } else {
            if(!postMessage) {
                return setErrorMessage("cannot post empty comment")
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
                toggleStateChange()

            })
            .catch(error => {
                console.log('error submitting post', error)
            })   
    }

    const handleUploadImageClick = () => {
        // event.stopPropagation();
        setuploadImage(!uploadImage)
    }

    
    return (
        <form onSubmit={handleSubmit}>
            <textarea
                name="text"
                value = {postMessage}
                onChange={(message) => setPostMessage(message.target.value)}
            >
            </textarea>
            <br></br>
            <button type="button" onClick={handleUploadImageClick}>
                <i className="fa-solid fa-image"></i>
            </button>

            {uploadImage &&  
            <input 
                type="file" 
                name="file"
                accept="image/png, image/jpeg" 
                onChange={e => setFile(e.target.files[0])}
            />
            }
            <br></br>
            <button type='submit'>Post</button>
            <br></br>
            {errorMessage && errorMessage}
        </form>
    )


};

export default NewPost;