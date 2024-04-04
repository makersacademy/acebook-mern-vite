import { format } from 'date-fns';
import "../../css/post.css"
import LikeDislike from "../Likes/LikeCounter"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {Cloudinary} from "@cloudinary/url-gen";
import { getComments } from "../../services/posts";
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import CreateComment from './CreateComment';
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME

const Post = (props) => {
 const [likes,setLikes] = useState(props.post.likes)

  const cld = new Cloudinary({cloud: {cloudName: CLOUD_NAME}});

  const imageLocation = props.post.image;
  const myImage = cld.image(imageLocation);
  myImage.resize(fill().width(250).height(250));  
  
  const postId = props.post._id
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  
  const getNewCommentsTrigger = (postId, token) => {
    getComments(postId, token)
        .then((data) => {
          setComments(data.comments);
          localStorage.setItem("token", data.token);
        })
  } 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    else {
      getNewCommentsTrigger(postId, token);
      }
  }, [navigate]);

  const handleCreateComment = async () => {
    try {
      const token = localStorage.getItem("token");
      getNewCommentsTrigger(postId, token);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };
  
    const howLongAgo = () => {
      const postDateTime = new Date(props.post.post_date);
      const formatedPostDateTime = format(postDateTime, "do MMMM yyyy, HH:mm");
      const now = new Date();
      const timeDifferenceSeconds = (now.getTime() - postDateTime.getTime())/1000;
      const timeDifferenceMins = Math.round(timeDifferenceSeconds /60);
      const timeDifferenceHours = Math.round(timeDifferenceMins /60);
      if (timeDifferenceSeconds < 60 ) {
        return "Less than a minute ago"
      } else if (timeDifferenceMins > 1 && timeDifferenceMins < 60) {
        return `${timeDifferenceMins} minutes ago`
      } else if (timeDifferenceMins === 1) {
        return `${timeDifferenceMins} minute ago`
      } else if (timeDifferenceHours > 1 && timeDifferenceHours < 24) {
        return `${timeDifferenceHours} hours ago`
      } else if (timeDifferenceHours === 1) {
        return `${timeDifferenceHours} hour ago`
      } else {
        return formatedPostDateTime;
      }
    }

  return <article className= "post" key={props.post._id}>
    <div>
    <p data-testid = "message"> {props.post.message}</p>
    {props.post.image && <div><AdvancedImage cldImg={myImage} /></div>}
    <p data-testid = "time-ago">{howLongAgo()}</p>
    <div>
    <CreateComment postId={props.post._id} onCreateComment={handleCreateComment} />
    Comments:
    {comments.map((comment) => (
          <div key={comment._id}>{comment.message}</div>
        ))}
      </div>
    <p data-testid = "count"> {likes} </p>
    <LikeDislike setLikes={setLikes} likes={likes} postId={props.post._id} />
    </div>
  </article>
};

export default Post;
