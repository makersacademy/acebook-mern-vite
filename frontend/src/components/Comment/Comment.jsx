    // Create comment object with this component...

import "./Comment.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Comment = (props) => { 
    return (
        <div className="comment-feed">
                <img
                src={props.profilePicture}
                alt="Profile"
                className="comment-profile-picture"
                onError={(e) => { e.target.onerror = null; e.target.src=`${import.meta.env.VITE_BACKEND_URL}/uploads/default-profile-photo.jpg`; }}
                />
                <div className="comment-content">
                    <div className="user-info-commment">
                        <strong>{props.comment.userId.firstName} {props.comment.userId.lastName}</strong>
                        <h3 className="comment-message">{props.comment.commentMessage}</h3>
                    </div>
                    <div className="comment-info-feed">
                            <span className="comment-date">{new Date(props.comment.createdAt).toLocaleString()}</span>
                            <div className="likes-feed">
                                <FontAwesomeIcon 
                                    icon={faHeart} 
                                    // className={`heart-feed ${hasLiked ? 'liked' : ''}`} 
                                    // onClick={handleLikeToggle}
                                />
                                <span>0</span>
                            </div>
                    </div>
            </div>
        </div>
    )
    }

    export default Comment;
