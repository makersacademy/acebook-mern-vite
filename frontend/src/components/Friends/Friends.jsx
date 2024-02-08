const Friend = (props) => {
    return <article key={props.friend._id}>
        <div><img className="img" src={"data:image/png;base64," + props.friend.profilePic}/> {props.friend.username}</div>
        </article>;
    
};

export default Friend;