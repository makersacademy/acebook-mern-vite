// frontend/src/components/Comment/Comment.jsx

import React, { useState } from 'react';
import "./comment.css"

const Comment = ({ comment_data }) => {
    const [showOptions, setShowOptions] = useState(false)
    const handleOptions = () => {
        setShowOptions(!showOptions)
    }

    return (
        <div className="comment">
            <div className='comment-user'>
                <img src={comment_data.profile_pic} alt="" className='profile-pic'/>
                <h5 className="comment-author">{comment_data.full_name}</h5>
                <button className='options' onClick={handleOptions}>...</button>
                {showOptions && (
                    <div className='options-menu'>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                )}
            </div>
            <p className="comment-text">{comment_data.message}</p>
        </div>
    );
};

export default Comment;