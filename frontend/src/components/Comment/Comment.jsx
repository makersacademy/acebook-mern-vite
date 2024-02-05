// frontend/src/components/Comment/Comment.jsx

import React from 'react';
import "./comment.css"

const Comment = ({ comment_data }) => {
    return (
        <div className="comment">
            <div className='comment-user'>
                <img src={comment_data.profile_pic} alt="" className='profile-pic'/>
                <h5 className="comment-author">{comment_data.full_name}</h5>
            </div>
            <p className="comment-text">{comment_data.message}</p>
        </div>
    );
};

export default Comment;