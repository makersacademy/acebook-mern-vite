import { Component } from "react";
import Post from "./Post";

function ListOfPosts(props) {
  // console.log(props);
  // console.log(props.posts);
  return(
    <div className="feed-component" role="feed-component"> 
      {props.posts.map((post) => (
      <Post 
        key={post._id} 
        message={post.message} 
        dateCreated={post.dateCreated}
        username={post.user?.username}
        noOfLikes={post.noOfLikes}
      />
      ))}
    </div>
  );
};

export default ListOfPosts;