
const Post = (props) => {
  const createdDate = new Date(props.post.date).toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: '2-digit' })
  
  const handleNumOfLikes = () => {
    props.setPosts((prevPosts) =>
      prevPosts.map((prevPost) =>
        prevPost._id=== props.post._id ? { ...prevPost, numOfLikes: prevPost.numOfLikes + 1 } : prevPost
      )
    );
  }
  return (
    <>
      <article key={props.post._id}>{props.post.message}</article>
      <article key={props.post._id}>{createdDate}</article>
      <div className="like-btn">
        <button onClick={()=>handleNumOfLikes()}>{props.post.numOfLikes}</button>
      </div>
    </>
  );
};


export default Post;





//if we wanted to keep the function in FeedPage:
  // const handleNumOfLikes = (id) => {
  //   setPosts((prevPosts) =>
  //     prevPosts.map((post) =>
  //       post._id === id ? { ...post, numOfLikes: post.numOfLikes + 1 } : post
  //     )
  //   );
  // }
  //          handleNumOfLikes= {() => handleNumOfLikes(post._id)}
