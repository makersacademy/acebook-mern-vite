import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../services/users";
import UserProfile from "../../components/UserProfile";
import { NavbarComponent } from "../../components/NavbarComponent";

export function Profile() {

  const [user, setUser] = useState({});
  
  const navigate = useNavigate();

    // GET USER
    useEffect(() => {
      const token = localStorage.getItem("token");
      const loggedIn = token !== null;
      if (loggedIn) {
        getUser(token)
          .then((data) => {
            setUser(data.user);
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
  
  return (
    <>
  <NavbarComponent />
    <h2>My Profile</h2>
      <div>
        <img src={user.imgURL}></img>
        {user && <UserProfile user={user} key={user._id} />}
      </div>
    </>
  );
}