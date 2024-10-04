function Post(props) {

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: 'numeric', hour12: true}
    return new Date(date).toLocaleDateString(undefined, options)
    //return date
  }
  
  return (
    <article key={props.post._id}>
      {props.post.message} 
      Posted on: {formatDate(props.post.createdAt)}
    <br>
    </br>
      Posted By: {props.post.user}
    </article>
  )
}

export default Post;

