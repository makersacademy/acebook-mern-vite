import './User.css';

const User = ({_id, username, email, friends, image, bio, posts }) => {
    return (
        <div className="User" key={_id}>
            <img src={image} alt="Profile Picture" />
            <p>{_id}</p>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>Bio: {bio}</p>
            <p>Friends: </p>
            
            {friends.map((friend) => 
                friend ? <p key={friend._id}>{friend.username}</p> : null
            )}

            <p>Posts: </p>
            
            {posts.map((post) => 
                post ? 
                <div key={post._id}>
                    <p>post message: {post.message}</p> 
                    <p>likes: {post.likes}</p> 
                    <p>posted at: {post.createdAt}</p>
                    <p>comments:</p>

                    {post.comments.map((comment) => {
                        comment ?
                        <div key={comment._id}>
                            <p>comment: {comment.message}</p>
                            <p>likes: {comment.likes}</p>
                            <p>posted by: {comment.user.username}</p>
                        </div>
                        : null
                    })}
                    
                </div>  
                    : null
            )}

        </div>
    )

}
export default User;
