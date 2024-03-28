const Post = (props) => {
  return (
  <div className="container">
    <div className="row">
      <div className="col-3"></div>
      <div className="col-6">
      <article key={props.post._id}>{props.post.user} posted at {props.post.createdDate}</article>
      </div>
    </div>
    <div className="row">
      <div className="col-3"></div>
      <div className="col-6 ">
      <article key={props.post._id}>{props.post.message}</article>
      </div>
    </div>
    <div className="row">
    <div className="col-6"></div>
      <div className="col-6">
        <div className="p">Likes:</div>
      <article key={props.post._id}>{props.post.likes}</article>
      </div>
    </div>
  </div>
  );
};



export default Post;
