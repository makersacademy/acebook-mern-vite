const UserProfile = (props) => {

    return (
        <>
            <h3>Username: {props.user.username}</h3>
            <p>Email: {props.user.email}</p> 
            <p>UserID: {props.user._id}</p>
        </>
    )
}

export default UserProfile;
