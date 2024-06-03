import { getComments } from "../../services/posts";
import Post from "../Post/Post";
import { useState, useEffect } from "react";

const ShowComments = (props) => {
    const [comments, setComments] = useState([])
    const token = localStorage.getItem("token");

    useEffect(() => {
        getComments(token, props.parent)
        .then((data) => {
          setComments(data.posts);
          localStorage.setItem("token", data.token);
        })
    }, []);

    return (
        <div>
            {comments.map((post) => (
                [<Post post={post} key={post._id} value={props.value} update={props.update} />, console.log(post._id)]
            ))}
        </div>
    );
};

export default ShowComments;
