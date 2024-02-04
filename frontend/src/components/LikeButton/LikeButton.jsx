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
        // Handle errors appropriately
    }
};
// const handleClick = async (props) => {
//     await likeThePost(props)
//         .then(() => props.handleLikeUnlike())
//         .then(() => {
//             props.clicked();
//             console.log("Clicked is being clicked");
//         })
//     console.log("I'm being clicked");
// props.handleLikeUnlike();
// };

const LikeButton = (props) => {
    const [like, setLike] = useState(false);
    const handleClick = async (props) => {
        await likeThePost(props)
            .then(() => props.handleLikeUnlike())
            .then(() => {
                // props.clicked();
                console.log("Clicked is being clicked");
				props.toggleStateChange()
            })
            .then(() => {
                setLike(!like);
                console.log("and me!");
            });
        console.log("I'm being clicked");
        // props.handleLikeUnlike();
    };
    return (
    <button onClick={() => handleClick(props)}>
        <i className="fa-solid fa-thumbs-up"></i>
    </button>
    )
};

export default LikeButton;
