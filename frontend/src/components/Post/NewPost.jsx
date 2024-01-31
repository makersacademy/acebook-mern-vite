import { useState } from 'react';

const NewPost = ({ onNewPost }) => {
    const [postMessage, setPostMessage] = useState('');

    const submit = async () => {

        if (postMessage) {

            onNewPost(postMessage)

            setPostMessage('');
        }
        
    };

    return (
        <form onSubmit={submit}>
            <textarea
                value = {postMessage}
                onChange={(message) => setPostMessage(message.target.value)}
            ></textarea>
            <button type='submit'>Post</button>
        </form>
    )
};

export default NewPost