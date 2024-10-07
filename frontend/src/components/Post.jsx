import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function Post(props) {

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: 'numeric', hour12: true}
    return new Date(date).toLocaleDateString(undefined, options)
    //return date
  }
  
  return (

    <>
    <Card className="post-card" key={props.post._id}>
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        <Card.Text>
        {props.post.message} 
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className="post-metadata"><img src={props.post.userPic} className="postedbypic"></img></ListGroup.Item>
        <ListGroup.Item className="post-metadata">Posted on: {formatDate(props.post.createdAt)}</ListGroup.Item>
        <ListGroup.Item className="post-metadata">Posted By: {props.post.user}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Like</Card.Link>
      </Card.Body>
    </Card>

    {/* <article key={props.post._id}>
      {props.post.message} 
      Posted on: {formatDate(props.post.createdAt)}
    <br>
    </br>
      Posted By: {props.post.user}
    </article> */}
    </>

  )
}

export default Post;

