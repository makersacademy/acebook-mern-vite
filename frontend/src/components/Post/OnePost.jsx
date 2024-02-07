import React from "react";

const createDate = (date) => {
    // Extract date parts
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() is zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    // Format the date to dd/mm/yyyy hh:mm
    return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const OnePost = (props) => {
    const post = props.post
    const user = props.user
    const datetime = new Date(post.reg_time);
    const date = createDate(datetime);
    const [showResults, setShowResults] = React.useState(false)
    const onClick = () => {
        if(showResults === false) {
            setShowResults(true)
        } else {
            setShowResults(false)
        }}
    return (
        <article key={post._id}>
            <p className="message">{post.message}</p>
            {/*{console.log("user:")}
            {console.log(user)}*/}
            <p className="messageInfo">
            <img className="img" src={"data:image/png;base64," + user.profilePic}/> 
            {user.username}</p>
            <p>{date}</p>
            
            {/*uses coalescing operator to check for whether props.post.likes
            has a value for length, if so, use that value, else use 0 as default value*/}
            <div><p className="likes" onClick={onClick}>Likes: {post.likes?.length ?? 0}</p>
            { showResults ? <LikedBy post = {post}/> : null }</div>
        </article>
    );
};

const LikedBy = (props) => {
    console.log(props.post)
    return (
    <div className ="likedBy">Liked by: {props.post.likeUser.map((user) => (
        <div key={user._id}>
            {user.username}
            </div>
    ))}
    </div>
)}

export default OnePost;
