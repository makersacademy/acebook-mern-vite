const DeleteButton = (props) => {
    // const [like, setLike] = useState(props.liked);
    const deleteThePost = async (props) => {
        try {
            console.log(props);
            const response = await fetch(
                "http://localhost:3000/posts/:postId",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer " + window.localStorage.getItem("token"),
                    },
                    body: JSON.stringify({ postID: props.postID }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleClick = async () => {
        try {
            console.log("Deleting post...");
            await deleteThePost(props);
            console.log("Post deleted");

            // Call the provided onDelete callback to trigger a re-render
            if (props.onDelete) {
                console.log("Calling onDelete...");
                props.onDelete();
                console.log("onDelete called successfully");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return <button onClick={handleClick}>Delete</button>;
};

export default DeleteButton;
