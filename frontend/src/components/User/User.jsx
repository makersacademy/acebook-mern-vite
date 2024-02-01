import { useState, useEffect } from 'react';
import Comment from '../Comment/Comment.jsx';
import './User.css';

const User = ({_id, username, email, friends, image, bio, posts }) => {
    const [userPosts, setUserPosts] = useState([])


    useEffect(()=> {
        const sortedPosts = posts.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setUserPosts(sortedPosts.reverse());
    }, ([posts]))
    
    
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

            {userPosts.map((post) => 
                post ? 
                <div key={post._id}>
                    <p>post message: {post.message}</p> 
                    <p>likes: {post.likes}</p> 
                    <p>posted at: {new Date(post.createdAt).toLocaleString('en-UK')}</p>
                    <p>comments:</p>

                    {post.comments.map((comment) => 
                        comment ? 
                            <Comment 
                            key={_id}
                            _id={comment._id}
                            message={comment.message}
                            likes={comment.likes}
                            postedBy={comment.user}
                            postedAt={comment.createdAt}
                            /> 
                            : null )
                    }
                </div>  
                    : null
            )}
        </div>
    )

}
export default User;
