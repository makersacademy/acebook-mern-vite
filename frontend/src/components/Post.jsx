function Post(props) {

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: 'numeric', hour12: true}
    return new Date(date).toLocaleDateString(undefined, options)
    //return date
  }
  
  return (
    <article key={props.post._id}>
    <img src={props.post.userPic} className="postedbypic"></img> Messsage: {props.post.message}&nbsp; //* Only things in the img tag are necessary *//
        Posted on: {formatDate(props.post.createdAt)}
    <br>
    </br>
      Posted By: {props.post.user}
      <br></br>
      <br></br>

    </article>
  )
}

export default Post;

