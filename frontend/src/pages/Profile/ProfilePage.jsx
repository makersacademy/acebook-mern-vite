import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getUser } from "../../services/users";
import User from "../../components/User/User";

export const ProfilePage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      
      getUser(token)
      
        .then((data) => {
          setUsers(data.user);
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
      <h2>Profile</h2>
      <div className="profile" role="profile">
        
        {users.map((user) => (
          <User user={user} key={user._id} />
        ))}
      </div>
    </>
  );
};
