import "./Post.css";
import "../../pages/User/UserPage.css";
import LikeButton from "../LikeButton/LikeButton";
import React, { useState } from "react";
import AddComment from "../AddComment/AddComment";
import Comment from "../Comment/Comment";
import DeleteButton from "../DeleteButton/DeleteButton";
import timeFromNow from "../../utils/TimeFromNow";
import { Link } from "react-router-dom";

const Post = (props) => {

    const [like, setLike] = useState(false);
    const [likes, setLikes] = useState(props.post.likes.length);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [showMoreComments, setShowMoreComments] = useState(false);
    const [hideComments, setHideComments] = useState(false);
    const [deletes, setDeletes] = useState(false);

    const handleDelete = () => {
        setDeletes(!deletes);
    };

    const user = JSON.parse(window.localStorage.getItem("user"));

    const isPostOwner = user._id && props.post.postedBy._id === user._id;

    const handleLikeUnlike = () => {
        setLike(!like);
        setLikes(props.post.likes.length);
    };

    const checkLikes = (props) => {
        setLikes(props.post.likes.length);
    };

    const addCommentClick = () => {
        setShowCommentBox(!showCommentBox);
    };

    const showMoreCommentsClick = () => {
        setShowMoreComments(true);
        setHideComments(true);
    };

    const hideCommentsClick = () => {
        setShowMoreComments(false);
    };

    const sortedComments = props.post.comments.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    return (
        <div key={props.post._id} className="post-container">
            <article>
                {props.postedBy && (
                    <div className="post-header">
                        <div className="post-user-image-container">
                            <Link to={`/users/${props.postedBy.username}`} className="post-user-image">
                                <img src={props.postedBy.image} alt="user image"></img>
                            </Link>
                        </div>
                        <div className="username-time-container">
                            <div className="post-username">
                            <Link to={`/users/${props.postedBy.username}`} className="post-username">
                                <h4>{props.postedBy.username}</h4>
                            </Link>
                            </div>
                            <div className="date-time">
                                {timeFromNow(props.post.createdAt)}
                            </div>
                        </div>
                    </div>
                )}
                    <div className="post-body">
                        <div className="post-image-container">
                            {props.post.media !== "../public/images/null" && (
                                <>
                                    <img src={props.post.media}></img>
                                </>
                            )}
                        </div>
                        <div className="post-text">
                            {props.post.message}
                        </div>
                    </div>

                    <div className="post-footer"> 
                        <div className="like-container">
                            <div className="like-button-container">
                            <LikeButton
                                postID={props.post._id}
                                like={like}
                                handleLikeUnlike={handleLikeUnlike}
                                clicked={props.clicked}
                                toggleStateChange={props.toggleStateChange}
                                liked={props.liked}
                                post_userId={props.postedBy._id}
                                loggedInUsername={props.loggedInUsername}
                                token={props.token}
                            />
                            </div>
                            <div className="like-number">
                                {props.post.likes.length}
                            </div>
                        </div>
                            <div className="delete-post-button-container">
                                <DeleteButton
                                    postID={props.post._id}
                                    handleDelete={handleDelete}
                                    onDelete={props.onDelete}
                                    showButton={isPostOwner}
                                />
                            </div>
                    </div>

                <div className="comments">
                    <p> comments </p>
                    <button onClick={addCommentClick}>add comment</button>

                    {showCommentBox && (
                        <div className="comment-box">
                            <AddComment
                                postId={props.post._id}
                                toggleStateChange={props.toggleStateChange}
                                post_userId={props.postedBy._id}
                            />
                        </div>
                    )}
                    <ul>
                        {sortedComments.length > 0 && (
                            <Comment
                                _id={sortedComments[0]._id}
                                message={sortedComments[0].message}
                                likes={sortedComments[0].likes}
                                // postedBy={comment.user.username}
                                postedAt={sortedComments[0].createdAt}
                                user={sortedComments[0].user}
                            />
                        )}

                        {sortedComments.length > 1 && !showMoreComments && (
                            <button onClick={showMoreCommentsClick}>...</button>
                        )}

                        {showMoreComments &&
                            sortedComments
                                .slice(1)
                                .map((comment) => (
                                    <Comment
                                        key={comment._id}
                                        _id={comment._id}
                                        message={comment.message}
                                        likes={comment.likes}
                                        postedAt={comment.createdAt}
                                        user={comment.user}
                                    />
                                ))}

                        {showMoreComments && (
                            <button onClick={hideCommentsClick}>hide</button>
                        )}
                    </ul>
                </div>
            </article>
        </div>
    );

};

export default Post;
