// frontend/src/components/Comment/Comment.jsx

import React from 'react';

const Comment = ({ author, timestamp, text }) => {
    return (
        <div className="comment">
            <div className="comment-author">{author}</div>
            <div className="comment-timestamp">{timestamp}</div>
            <div className="comment-text">{text}</div>
        </div>
    );
};

export default Comment;