import "./Post.css";
import LikeButton from "../LikeButton/LikeButton";
import React, { useState } from "react";
import AddComment from "../AddComment/AddComment";
import Comment from "../Comment/Comment";
import DeleteButton from "../DeleteButton/DeleteButton";
import timeFromNow from "../../utils/TimeFromNow";

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

    const revSortedComments = sortedComments.reverse();

    return (
        <div key={props.post._id} className="post-article">
            <article>
                {props.postedBy && (
                    <div className="user-info">
                        <img src={props.postedBy.image} alt="user image"></img>
                        <h4>{props.postedBy.username}</h4>
                    </div>
                )}
                <div className="date-time">
                    {timeFromNow(props.post.createdAt)}
                </div>

                {props.post.media !== "../public/images/null" && (
                    <>
                        <img src={props.post.media}></img>
                    </>
                )}

                {props.post.message}
                <br></br>
                <br></br>
                <div className="like-container">
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
                    <h5>{props.post.likes.length}</h5>
                </div>
                <DeleteButton
                    postID={props.post._id}
                    handleDelete={handleDelete}
                    onDelete={props.onDelete}
                    showButton={isPostOwner}
                />
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
                        {revSortedComments.length > 0 && (
                            <Comment
                                _id={revSortedComments[0]._id}
                                message={revSortedComments[0].message}
                                likes={revSortedComments[0].likes}
                                // postedBy={comment.user.username}
                                postedAt={revSortedComments[0].createdAt}
                                user={revSortedComments[0].user}
                            />
                        )}

                        {revSortedComments.length > 1 && !showMoreComments && (
                            <button onClick={showMoreCommentsClick}>...</button>
                        )}

                        {showMoreComments &&
                            revSortedComments
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
