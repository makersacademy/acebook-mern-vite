function Post(props) {
  const cleanDate = new Date(props.timestamp)
    .toLocaleString("en-gb")
    .slice(0, -3)
    .replaceAll(",", "");
  return (
    <div>
      <h2>{props.user}</h2>
      <h3>{cleanDate}</h3>
      <article key={props._id}>{props.message}</article>
    </div>
  );
}

export default Post;
