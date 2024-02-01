import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Post from "../../components/Post/Post";
import { getSinglePost } from "../../services/posts";

export const PostPage = () => {
    const [post, setPost] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const navigate = useNavigate();
    
    useEffect(() => {
        if (token){
            getSinglePost(token).then((data) => {
                setPost(data.post);
                setToken(data.token);
                window.localStorage.setItem("token", data.token);
                // console.log(data)
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
        <>
        <h2>Posts</h2>
            sdadasdasfas
        </>
    );
};
