import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OnePost from "../../components/Post/OnePost";
import DeletePostButton from "../../components/Post/DeletePostButton";
import EditPost from "../../components/Post/EditPost";
import Comment from "../../components/Comments/Comments";
import CreateComment from "../../components/Comments/CreateComment";
import DeleteCommentButton from "../../components/Comments/DeleteCommentButton";
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
    const [buttonDisplay, setButtonDisplay] = useState(true);
    const navigate = useNavigate();

    // const handleButtonDisplay = () => {
    //     getProfile(token)
    //         .then((data) => {
    //             setCurrentUsername(data.users[0].username);
    //         })
    //         .then(() => {
    //             if (currentUsername != post.username) {
    //                 setButtonDisplay(false);
    //                 // console.log(buttonDisplay)
    //                 // console.log("current user: " + currentUsername)
    //                 // console.log("Post user: " + post.username)
    //             } else {
    //                 setButtonDisplay(true);
    //                 // console.log("current user: " + currentUsername)
    //                 // console.log("Post user: " + post.username)
    //                 // console.log(buttonDisplay)
    //             }
    //         });
    //     return buttonDisplay;
    // };
    // console.log(handleButtonDisplay());

    useEffect(() => {
        if (token) {
            getSinglePost(postId, token)
                .then((data) => {
                    setPost(data.post[0]);
                    setUser(data.post[0].user[0]);
                    setToken(data.token);
                    console.log(data.userMatch)
                    setButtonDisplay(data.userMatch)
                    window.localStorage.setItem("token", data.token);
                    return buttonDisplay
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

                <OnePost post={post} user={user} key={post._id} />


                {buttonDisplay && <EditPost message = {post.message}/>}
                {buttonDisplay && <DeletePostButton />}

                <LikePostButton post={post}/>

            </div>
            <hr></hr>
            <h2>Comments</h2>
            <div className="feed">
                {comments.map((comment) => (
                    <div key={comment._id}>
                        <p role="CommentsDisplay"><Comment comment={comment} key={comment._id} /></p>
                        <DeleteCommentButton comment={comment} key={comment._id}/>
                    </div>
                ))}
            </div>
            <div className="createComment">
                <CreateComment postID={postId} />
            </div>
        </>
    );
};
