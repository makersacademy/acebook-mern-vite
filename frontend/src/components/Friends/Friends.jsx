const Friend = (props) => {
    return <article key={props.friend._id}>
        <div>{props.friend.username}</div>
        </article>;
    
};

export default Friend;