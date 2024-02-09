import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OnePost from "../../components/Post/OnePost";
import DeletePostButton from "../../components/Post/DeletePostButton";
import EditPost from "../../components/Post/EditPost";
import Comment from "../../components/Comments/Comments";
import CreateComment from "../../components/Comments/CreateComment";
import DeleteCommentButton from "../../components/Comments/DeleteCommentButton";
import EditComment from "../../components/Comments/EditComment";
import { getSinglePost } from "../../services/posts";
import { getAllComments } from "../../services/comments";
import LikePostButton from "../../components/Post/LikePost";


export const PostPage = () => {
    const handle = useParams();
    //console.log(handle.id)
    const postId = handle.id;

    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const [comments, setComments] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    // const [currentUsername, setCurrentUsername] = useState([]);
    const [postButtonDisplay, setPostButtonDisplay] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            getSinglePost(postId, token)
                .then((data) => {
                    setPost(data.post[0]);
                    setUser(data.post[0].user[0]);
                    setToken(data.token);
                    console.log(data.userMatch)
                    setPostButtonDisplay(data.userMatch)
                    window.localStorage.setItem("token", data.token);
                    return postButtonDisplay
                })
                .catch((err) => {
                    console.log(err);
                    navigate("/login");
                });

            getAllComments(postId, token)
                .then((data) => {
                    // console.log(data.comments)
                    setComments(data.comments);
                    setToken(data.token);
                    window.localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            navigate("/login");
        }
    }, []);

    if (!token) {
        return;
    }
    return (
        <>
            <div role="postContent">
                <h2>Post</h2>

                <OnePost post={post} user={user} key={post._id} />

                <LikePostButton post={post}/>
                {postButtonDisplay && <EditPost message = {post.message}/>}
                {postButtonDisplay && <DeletePostButton />}

                

            </div>
            <hr></hr>
            <h2>Comments</h2>
            <div className="feed">
                {comments.map((comment) => (
                    <div key={comment._id}>
                        <p role="CommentsDisplay"><Comment comment={comment} key={comment._id} /></p>
                        {comment.userMatch && <EditComment comment = {comment} key={"editComment"} message = {comment.message}/>}
                        {comment.userMatch && <DeleteCommentButton comment={comment} key={"deleteComment"}/>}
                        <hr />
                    </div>
                ))}
            </div>
            <div className="createComment">
                <CreateComment postID={postId} />
            </div>
        </>
    );
};
