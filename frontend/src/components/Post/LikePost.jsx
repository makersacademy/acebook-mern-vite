import { useState} from "react";
import { useNavigate } from "react-router-dom";
import {likePost} from "../../services/posts";
import koalathumbsup from "../../assets/koalathumbsup.png"
import thumbsup from "../../assets/thumbsup.png"
import './LikePost.css'



const LikePostButton = (prop) => {
    const navigate = useNavigate();
    //const handle = useParams();
    const postId = prop.post._id
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const handleLike = () => {
        likePost(postId, token).then((data) => {
            setToken(data.token)
            window.localStorage.setItem("token", data.token);
            console.log("Item Liked")
            navigate(0)
        }).catch((err) => {
            console.log(err)
        })
    }

    return <>
    <button onClick={handleLike} className="likeButton">
        <img src={koalathumbsup} height = "40"></img></button>
    </>

  };
  
  export default LikePostButton;
  