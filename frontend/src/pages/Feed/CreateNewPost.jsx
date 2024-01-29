import React from "react";

export const CreateNewPost = () => {

    return (
    <>
        <h2>Create a new post</h2>
        <div className="feed" role="feed">
            <form method='POST' action='/posts' >
                <label>
                    What's on your mind?
                    <input name='postContent' type='text' ></input>
                </label>
                <button type='submit' >Submit post</button>
            </form>
        </div>
    </>
    );
};

export default CreateNewPost;
