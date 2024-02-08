import { useState, useEffect } from 'react';
import Comment from '../Comment/Comment.jsx';
import './User.css';
import Post from '../Post/Post.jsx';
import { addFriend, removeFriend } from '../../services/user.js';
import Notification from '../Notification/Notification.jsx';
import Friends from '../Friends/Friends.jsx';

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
    }, [posts])

    const handleAddFriend = () => {
        addFriend(_id, loggedInUserId, username, token)
            .then(res => {
                console.log(res)
                triggerStateChange()
            });
                
    }

    const handleRemoveFriend = () => {
            removeFriend(_id, loggedInUserId, username, token)
            .then(res => {
                console.log(res)
                triggerStateChange()
            });
    }
    
    
    return (
        <div className="user" key={_id}>
            <div className="profile-image-container">
                <img src={image} alt="Profile Picture" className="user-image"/><br></br>
            </div>

            {/* <p>notifications: </p>

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
            )} */}
            <div className="user-name">
                {username}
            </div>
            <div className="user-email">
                <p>Email: {email}</p>
            </div>
            <div className="user-bio">
                <p>Bio:</p>
                {bio}
            </div>

            <div className="friend-button-container">
            {loggedInUserId !== _id && (friendIds.includes(loggedInUserId) ?
    
                <button className="friend-button"
                    onClick={handleRemoveFriend}>
                        remove from friends
                </button>
            
                : 
            
                <button className="friend-button"
                    onClick={handleAddFriend}>
                        Add friend
                </button> 
            
            )}
            </div>

            
            
            {/* <p>Posts: </p>

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
            )} */}
        </div>
    )

}
export default User;
