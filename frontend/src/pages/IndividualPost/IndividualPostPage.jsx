import { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import { getSinglePost } from "../../services/posts";

export const PostPage = () => {
    const handle = useParams()
    console.log(handle.id)
    const postId = handle.id

    const [post, setPost] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        if (token){
            getSinglePost(token, postId).then((data) => {
                setPost(data.post);
                setToken(data.token);
                window.localStorage.setItem("token", data.token);
                console.log(data)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            navigate("/login")
        }
    },[])

    if (!token) {
        return;
    }
    return (
        <div key={post._id}>
        <h2>Post</h2>
        <Post post={post[0]} key={post[0]._id}/>

        </div>
    );
};
