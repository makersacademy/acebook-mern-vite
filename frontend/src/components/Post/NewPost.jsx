import { useState } from 'react';
import { createPost } from '../../services/posts'
const NewPost = ( {token} ) => {
    const [postMessage, setPostMessage] = useState('');

    const handleSubmit = () => {
        createPost(token, postMessage).preventDefault()

    };
    
    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value = {postMessage}
                onChange={(message) => setPostMessage(message.target.value)}
            ></textarea>
            <button type='submit'>Post</button>
        </form>
    )
    
};

export default NewPost