import { NavbarComponent } from "../../components/NavbarComponent";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/users";
import UserProfile from "../../components/UserProfile";

export function AllUsersPage() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
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

  return (
    <>
      <NavbarComponent />
      <h2>All User Profiles</h2>
      <div>
        {users.map((user, index) => (
          <UserProfile user={user} key={index} />
        ))}
      </div>
    </>
  );
}

// export default AllUsersPage;
