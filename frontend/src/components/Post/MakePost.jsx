import { useState } from "react";
import { makePost } from "../../services/posts";

const MakePost = (props) => {
    const [postData, setPostData] = useState("");
    const dateTimeString = new Date()
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        try {
            await makePost(token, postData, dateTimeString, props.parent);
            props.update(!props.value);
            console.log("Refreshed")
            setPostData("");
        } catch (err) {
            console.error(err);
        }
    };

    const handlePostChange = (event) => {
        setPostData(event.target.value);
    };
    return (
        <>
        <div id="make-post">
            <form onSubmit={handleSubmit}>
                <label htmlFor = "new-post">
                Write a post!
                </label>
                <textarea
                id="new-post"
                type="text"
                value={postData}
                onChange={handlePostChange}
                />
                <input role="submit-button" id="submit" type="submit" value="Post" />
            </form>
        </div>
        </>
    )
}

export default MakePost;