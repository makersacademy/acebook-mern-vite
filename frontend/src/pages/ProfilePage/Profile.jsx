import { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data from the backend
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/controllers/profile'); // Adjust endpoint
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="profile">
            {user && (
                <div>
                    <div className="profile-header">
                        <div className="profile-picture">
                            <img src={user.profilePicture} alt="Profile" />
                        </div>
                        <div className="profile-info">
                            <h1>{user.firstName} {user.lastName}</h1>
                            <p>{user.bio}</p>
                        </div>
                    </div>
                    <div className="profile-feed">
                        {/* Render user's posts or activity feed */}
                        {/* You can map over user.posts or user.activity depending on your backend response */}
                        {user.posts.map(post => (
                            <div key={post._id} className="profile-post">
                                <p>{post.message}</p>
                                <p>Likes: {post.numOfLikes}</p>
                                {/* Add additional post details here */}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;