import LikeButton from "../LikeButton/LikeButton";

const Post = (props) => {
	return (
		<div>
			<article key={props.post._id}>{props.post.message}</article>
			<LikeButton />
		</div>
	);
};

export default Post;
