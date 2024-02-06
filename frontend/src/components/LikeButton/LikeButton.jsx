import { useState } from "react";
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
			props.handleLikeUnlike();
			props.toggleStateChange();
			setLike((prevLike) => !prevLike);
			console.log("Clicked is being clicked");
		} catch (error) {
			console.error("Error liking/unliking post:", error);
		}
		// likeThePost not working below try statement needs to be after await likeThePost when working
		try {
			const notificationResult = await createNotification({
				username: props.loggedInUsername, 
				entity_userId: props.post_userId,
				token: props.token,
				notificationType: "post-like"
			})
		} catch (error) {
			console.log("An error occured while creating a notification")
		}



	};

	return (
		<button onClick={handleClick}>
			{props.liked ? (
				<i className="fa-solid fa-thumbs-up"></i>
			) : (
				<i className="fa-regular fa-thumbs-up"></i>
			)}
		</button>
	);
};

export default LikeButton;
