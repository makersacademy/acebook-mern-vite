const User = ({_id, username, email, friends }) => {
    return (
        <div className="User" key={_id}>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>Friends: </p>
            
            {friends.map((friend) => 
                friend ? 
                <p key={friend._id}>{friend.username}</p> 
                
                
                
                : null
            )}
        </div>
    )

}
export default User;