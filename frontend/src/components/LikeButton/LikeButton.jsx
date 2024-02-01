const LikeButton = (props) => {
    const { like } = props;
    const likeUnlike = () => {
        props.setLike(!like);
    };
    return <button onClick={likeUnlike}>{like ? "Unlike" : "Like"}</button>;
};
export default LikeButton;
