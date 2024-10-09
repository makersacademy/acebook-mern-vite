import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useState, useEffect } from "react";
import { createComment } from "../services/comments";
import Form from "react-bootstrap/Form";
import DisplayComment from "../components/DisplayComment";
import { getComments } from "../services/comments";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import LikeButton from "./LikeButton";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
  };

  const navigate = useNavigate();

  const [comment, setComment] = useState(""); // individual comment

  const [allComments, setAllComments] = useState([]); // all comments

  const [refreshComments, setRefreshComments] = useState(false); // all comments

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getComments(token)
        .then((data) => {
          setAllComments(data.comments);
          setRefreshComments(false);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate, refreshComments]);

  // set an individual comment into state
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // handleSubmit for posting a comment
  const handleSubmit = (event) => {
    event.preventDefault();
    createComment(comment);
    setComment(""); // clears COMMENT field upon submit
    setRefreshComments(true);
  };

  // set local storage item 'post_id' as the post id of the comment box being clicked on
  const handleClick = () => {
    localStorage.setItem("post_id", props.post._id);
  };

  const filteredComments = allComments.filter(
    (comment) => comment.post_id === props.post._id
  );

  return (
    <>
    <Container>
    <Card className="post-card" key={props.post._id}>
      <Row>
        <Col sm={4}>
        <Card.Img
          variant="top"
          src={props.post.userPic}
          className="profile-photo" 
        />
        </Col>
        <Card.Body>
          <Card.Text className="">{props.post.message}</Card.Text>
          <ListGroup className="list-group-flush">

          <ListGroup.Item className="post-metadata">
          <span>Posted By: {props.post.author ? props.post.author.username : "Unknown User"}</span> <span>on {formatDate(props.post.createdAt)}</span> 
          </ListGroup.Item>       

          <ListGroup.Item className="">
          <LikeButton
            post={props.post}
            user={props.user}
            toggleLike={props.toggleLike}
          /> <span className="mx-2">{props.post.likes.count}</span>
          </ListGroup.Item>

        </ListGroup>
        <Card.Footer>Footer</Card.Footer>
        </Card.Body>

      </Row>
      </Card>
    </Container>

 {/* OLD POST LAYOUT BELOW - PLEASE KEEP UNTIL STYLING IS HOW WE WANT IT */}
      <Card className="post-card" key={props.post._id}>
        <Card.Img
          variant="top"
          src={props.post.userPic}
          className="postedbypic roundedCircle" 
        />
        <Card.Body>
          <Card.Text>{props.post.message}</Card.Text>

          
        </Card.Body>

        <ListGroup className="list-group-flush">

          <ListGroup.Item className="post-metadata">
            Posted on: {formatDate(props.post.createdAt)}
          </ListGroup.Item>

          {/* <ListGroup.Item className="post-metadata">
            Posted By: {props.post.user}
          </ListGroup.Item> */}

          <ListGroup.Item className="post-metadata">
          Posted By: {props.post.author ? props.post.author.username : "Unknown User"}
          </ListGroup.Item>       

          <ListGroup.Item className="post-metadata">
            Likes: {props.post.likes.count}
          </ListGroup.Item>
          
          <LikeButton
            post={props.post}
            user={props.user}
            toggleLike={props.toggleLike}
          />
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

          <div>
            {filteredComments.map((comment) => (
              <DisplayComment
                key={comment._id}
                comment_text={comment.comment}
                user={comment.user}
                created_at={formatDate(comment.createdAt)}
              />
            ))}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default Post;
