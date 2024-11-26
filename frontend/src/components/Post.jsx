function Post(props) {
  return (
    <div>
      <h2>{props.user}</h2>
      <h3>
        {props.timestamp
          .replace("Z", "")
          .replace(":00.000", "")
          .replace("T", " ")}
      </h3>
      <article key={props._id}>{props.message}</article>
    </div>
  );
}

export default Post;
