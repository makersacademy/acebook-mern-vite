import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
import NewPost from "../../components/Post/NewPost" 
import Post from "../../components/Post/Post";
import Navbar from "../../components/NavBar/navbar";

export const FeedPage = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")))
    const [stateChange, setStateChange] = useState(false)

    const navigate = useNavigate();

    const toggleStateChange = () => {
        setStateChange(!stateChange)
    }


    useEffect(() => {
        if (token) {
            getPosts(token)
                .then((data) => {
                    const sortedPosts = data.posts.sort(
                        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                    );
                    setPosts(sortedPosts.reverse());
                    setToken(data.token);
                    window.localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.err(err);
                });
        } else {
            navigate("/login");
        }
    }, [stateChange]);

    if (!token) {
        return;
    }

	return (
		<div className="feedpage" data-testid="feed-page">
			<div className="navbar">
				<Navbar />
			</div>
			<h1>Posts</h1>
			<div className="feed" role="feed">
                <NewPost 
                token={token}
                userId={user._id}
                toggleStateChange={toggleStateChange}
                />

				{posts.map((post) => {
                    const liked = post.likes.includes(user._id)
                    return (
					<Post 
						key={post._id}
						post={post}
						postedBy={post.postedBy}
						toggleStateChange={toggleStateChange}
                        loggedInUsername={user.username}
                        token={token}
                        liked={liked}
					/>
                    )
                    })}
			</div>
		</div>
	);
};
