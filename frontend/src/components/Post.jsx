function Post(props) {
  const { _id, content, image } = props.post;

  // Check if there's image data
  let imageElement = null;
  if (image?.data && image?.contentType) {
    const base64String = btoa(
      new Uint8Array(image.data.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    imageElement = (
      <img
        src={`data:${image.contentType};base64,${base64String}`}
        alt="Post"
        style={{ maxWidth: "300px", marginTop: "10px" }}
      />
    );
  }

  return (
    <article key={_id}>
      <p>{content}</p>
      {imageElement}
    </article>
  );
}

export default Post;
