const Friend = (props) => {
    return (
        <article key={props.user._id}>
            {console.log(props)}
            <p className="username">{props.user.username}</p>
        </article>
    )
}

export default Friend;