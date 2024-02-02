import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import Navbar from "../../components/NavBar/navbar";

export const FeedPage = () => {
	const [posts, setPosts] = useState([]);
	const [token, setToken] = useState(window.localStorage.getItem("token"));
	const navigate = useNavigate();

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
	}, []);

	if (!token) {
		return;
	}

	return (
		<div className="feedpage" data-testid="feed-page">
			<div className="navbar">
				<Navbar />
			</div>
			<h2>Posts</h2>
			<div className="feed" role="feed">
				{posts.map((post) => (
					<Post 
						key={post._id}
						post={post}
						postedBy={post.postedBy}
					/>
				))}
			</div>
		</div>
	);
};
