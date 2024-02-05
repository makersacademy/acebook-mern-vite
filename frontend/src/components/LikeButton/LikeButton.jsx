import { useState } from "react";

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
	};

	return (
		<button onClick={handleClick}>{props.liked ? "unlike" : "like"}</button>
	);
};

export default LikeButton;
