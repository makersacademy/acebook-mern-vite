import './Post.css'

const Post = (props) => {

return (

<div className="post-article">
  <article 
      key={props.post._id}>
      {props.postedBy && 
      <div className="user-info">
        <img src={props.postedBy.image} alt="user image"></img>
        <h4>{props.postedBy.username}</h4>
      </div>
        }
        <div className="date-time">
          {new Date(props.post.createdAt).toLocaleString('en-UK')}
        </div>
      {props.post.message}<br></br>
      <h5>likes: {props.post.likes}</h5>
    </article>
  </div>
  )
};

export default Post;
