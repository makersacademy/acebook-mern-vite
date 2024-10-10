import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreatePostForm from "../../components/CreatePostForm";
import { getAllUsers } from "../../services/users";
import { getUser } from "../../services/users";
import UserProfile from "../../components/UserProfile";
import { NavbarComponent } from "../../components/NavbarComponent";
import AllPosts from "../../components/AllPosts";
import Container from "react-bootstrap/Container";  // Import Container
import Row from "react-bootstrap/Row";  // Import Row
import Col from "react-bootstrap/Col";  // Import Col

export function FeedPage() {
  const [users, setUsers] = useState([]);

  const [user, setUser] = useState({});

  const [refresh, setRefresh] = useState(false); // Create a boolean state that will rerender posts when changed

  const navigate = useNavigate();

  // GET USERS
  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getAllUsers(token)
        .then((data) => {
          setUsers(data.users);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);

  // GET USER
  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getUser(token)
        .then((data) => {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user)); // add all user data to local storage
          localStorage.setItem("username", data.user.username); // adds username to local storage
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  // This toggles the refresh to the opposite state eg true to false or false to true
  const createdPost = () => {
    setRefresh(prevRefresh => !prevRefresh);
  };

  return (
    <>
      <NavbarComponent />
      <div className="feedpage">

        <div className="my-5">
          <CreatePostForm whenPostCreated={createdPost} /> {/* Pass in the change state function */}
        </div>
    
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} md={12} className="mx-auto">
              <h1>Posts</h1>
              <AllPosts user={user} postFilter="all" refresh={refresh} /> {/* Pass the refresh state to the AllPosts component */}
              <h2>All User Profiles</h2>
              <div>
                {users.map((user, index) => (
                  <UserProfile user={user} key={index} />
                ))}
              </div>
              <br />
              <h2>Current User Profile</h2>
              <div>
                <img src={user.imgURL}></img>{" "}
                {/* Displays the img from the imgURL property of current user*/}
                {user && <UserProfile user={user} key={user._id} />}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
