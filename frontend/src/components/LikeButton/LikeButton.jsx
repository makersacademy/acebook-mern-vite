const likeThePost = async (props) => {
	try {
		const response = await fetch("http://localhost:3000/posts/likes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: window.localStorage.getItem("token"),
			},
			body: JSON.stringify({ postID: props.postID }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		console.log(data, "DATATATATATATATATATATA"); // Log the response data
	} catch (error) {
		console.error("Error fetching data:", error);
		// Handle errors appropriately
	}
};

const handleClick = async (props) => {
	await likeThePost(props).then(() => {
		console.log(props.postID);
	});
};

const LikeButton = (props) => {
	const { like } = props;

	const likeUnlike = () => {
		props.setLike(!like);
	};

	return <button onClick={() => handleClick(props)}></button>;
};

export default LikeButton;
