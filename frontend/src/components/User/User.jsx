import { useState, useEffect } from 'react';
import Comment from '../Comment/Comment.jsx';
import './User.css';
import Post from '../Post/Post.jsx';
import { addFriend, removeFriend } from '../../services/user.js';
import Notification from '../Notification/Notification.jsx';

const User = ({_id, username, email, friends, image, bio, posts, loggedInUserId, token, triggerStateChange, notifications }) => {
    const [userPosts, setUserPosts] = useState([])

    const friendIds = friends.map((friend) => {
        return friend._id
    })

    useEffect(()=> {
        const sortedPosts = posts.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setUserPosts(sortedPosts.reverse());
    }, ([posts]))

    const handleAddFriend = () => {
        addFriend(username, loggedInUserId, token)
            .then(res => console.log(res))
            .then(triggerStateChange())
    }

    const handleRemoveFriend = () => {
        removeFriend(username, loggedInUserId, token)
            .then(res => console.log(res))
            .then(triggerStateChange())
    }
    
    
    return (
        <div className="User" key={_id}>
            <img src={image} alt="Profile Picture" /><br></br>
            {/* <p>{_id}</p> */}
            
            {friendIds.includes(loggedInUserId) ?
    
                <button
                onClick={handleRemoveFriend}>
                    remove from friends
                </button>
            
            : 
            
            <button
            onClick={handleAddFriend}
            >Add friend</button> 
            
            }

            <p>notifications: </p>

            { notifications &&
                notifications.map((notification) => 
                    notification ? 
                    <div key={notification._id}>
                    
                    <Notification 
                        notification={notification}
                        username={username}
                        token={token}
                        triggerStateChange={triggerStateChange}
                    />
                    </div>

                    : null
            )}

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
                    <Post 
                        key={post._id}
                        post={post}
                        postedBy={post.postedBy}
                    
                    />

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
