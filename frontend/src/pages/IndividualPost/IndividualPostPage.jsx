import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import DeletePostButton from "../../components/Post/DeletePostButton";
import Comment from "../../components/Comments/Comments";
import CreateComment from "../../components/Comments/CreateComment";
import { getSinglePost } from "../../services/posts";
import { getAllComments } from "../../services/comments";

export const PostPage = () => {
    const handle = useParams();
    //console.log(handle.id)
    const postId = handle.id;

    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            getSinglePost(postId, token)
                .then((data) => {
                    setPost(data.post[0]);
                    setToken(data.token);
                    //console.log('post details:')
                    //console.log(data.post[0])
                    window.localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.log(err);
                    navigate("/login");
                });

            getAllComments(postId, token)
                .then((data) => {
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
                <Post post={post} key={post._id} />
                <DeletePostButton/>
            </div>
            <hr></hr>
            <h2>Comments</h2>
            <div className="feed" role="CommentsDisplay">
                {comments.map((comment) => (
                    <div key={comment._id}>
                        <Comment comment={comment} key={comment._id} />
                    </div>
                ))}
            </div>
            <div className="createComment">
                <CreateComment postID={postId} />
            </div>
        </>
    );
};
