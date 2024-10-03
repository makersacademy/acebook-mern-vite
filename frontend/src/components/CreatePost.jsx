import "./CreatePost.css"
import { useState } from 'react';

function CreatePost() {

    const [words, setWordCount] = useState(0);

    const handleWordCount = (event) => {
        const words = event.target.value;
        const length = words.split("").length
        if(length <= 500){
            setWordCount(length);
        }
        
    }
    return(
        <div className="CreateContainer">
            <h3>Create a Post</h3>
            <div className="FieldContainer">
                <form>
                    <textarea onChange={handleWordCount} maxLength='500' title="MessageBox"/>
                </form>
                <p className="WordCounter">{`${words}/500`}</p>
            </div>
            <button className="SubmitButton">Submit</button>
        </div>
    )
}

export default CreatePost;

