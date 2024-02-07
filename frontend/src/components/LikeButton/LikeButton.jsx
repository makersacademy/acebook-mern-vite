import { useState, useEffect } from "react";
import { createNotification } from "../../services/user";

const likeThePost = async (props) => {
    try {
        const response = await fetch("http://localhost:3000/posts/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + window.localStorage.getItem("token"),
            },
            body: JSON.stringify({ postID: props.postID }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const LikeButton = (props) => {
    const [like, setLike] = useState(props.liked);

    const handleClick = async () => {
        try {
            await likeThePost(props);
            setLike((prevLike) => !prevLike);
            props.handleLikeUnlike();
            props.toggleStateChange();
            if (!like) {
                try {
                    const notificationResult = await createNotification({
                        username: props.loggedInUsername,
                        entity_userId: props.post_userId,
                        token: props.token,
                        notificationType: "post-like",
                    });
                    console.log(notificationResult);
                } catch (error) {
                    console.log(
                        "An error occured while creating a notification"
                    );
                }
            } else {
                try {
                    const notificationResult = await createNotification({
                        username: props.loggedInUsername,
                        entity_userId: props.post_userId,
                        token: props.token,
                        notificationType: "post-unlike",
                    });
                    console.log(notificationResult);
                } catch (error) {
                    console.log(
                        "An error occured while creating a notification"
                    );
                }
            }
        } catch (error) {
            console.error("Error liking/unliking post:", error);
        }
    };

    return (
        <button onClick={handleClick}>
            {props.liked ? (
                <i
                    className="fa-solid fa-thumbs-up"
                    style={{ color: "red" }}></i>
            ) : (
                <i className="fa-regular fa-thumbs-up"></i>
            )}
        </button>
    );
};

export default LikeButton;
