import { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';
import Post from '../../components/Post/Post';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL || '';

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/profiles/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchUserPosts = async () => {
            try {
                const response = await axios.get(`${backendUrl}/profiles/profile/posts`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        };

        fetchUserData();
        fetchUserPosts();
    }, [backendUrl]);

    const updatePost = (updatedPost) => {
        setPosts(posts.map(post => post._id === updatedPost._id ? updatedPost : post));
    };

    return (
        <div className="container mt-4">
            {user && (
                <div className="text-center">
                    <div className="profile-header mb-4">
                        <img
                            src={user.profilePicture ? `${backendUrl}${user.profilePicture}` : `${backendUrl}/uploads/default-profile-photo.jpg`}
                            alt="Profile"
                            className="rounded-circle mb-3"
                            width="150"
                            height="150"
                            onError={(e) => { e.target.onerror = null; e.target.src=`${backendUrl}/uploads/default-profile-photo.jpg`; }}
                        />
                        <h1 className="mb-0">{user.firstName} {user.lastName}</h1>
                        <p className="text-muted">DOB: {new Date(user.DOB).toLocaleDateString()}</p>
                    </div>
                    <div className="profile-feed">
                        {posts.map(post => (
                            <Post key={post._id} post={post} updatePost={updatePost} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
