import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from "react";
import { createComment } from "../services/comments";
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
// import CreateCommentForm from "./CreateComment";

function Post(props) {
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      hour12: true,
    };
    return new Date(date).toLocaleDateString(undefined, options);
    //return date
  };

  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(props.post._id);
    createComment(comment);
    setComment(""); // clears COMMENT field upon submit
  };

  const handleClick = () => {
    localStorage.setItem("post_id", props.post._id);
  };

  return (
    <>
      <Card className="post-card" key={props.post._id}>
        <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
        <Card.Body>
          <Card.Text>{props.post.message}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item className="post-metadata">
            Posted on: {formatDate(props.post.createdAt)}
          </ListGroup.Item>
          <ListGroup.Item className="post-metadata">
            Posted By: {props.post.user}
          </ListGroup.Item>
        </ListGroup>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="message-box">
            <Form.Label>Enter Comment: </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={handleCommentChange}
              onClick={handleClick}
              value={comment}
              name="comment"
              placeholder="Your comment..."
            />
          </Form.Group>
          <Button value="Submit" variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        <Card.Body>
        <Card.Text>{props.comment}</Card.Text>
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
  );
}

export default Post;
