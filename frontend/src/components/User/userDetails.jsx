import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getUser from "../../services/user";

const UserDetails = () => {
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUser(token)
        .then((data) => {
          setUserData(data);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);

  return (
    <>
      <div>
        <h1>User Details</h1>
        <div className="fullName">{userData.fullName}</div>
        <img className="profile_pic" src={userData.profilePicture} />
        <div className="email">{userData.email}</div>
      </div>
    </>
  );
};

export default UserDetails;
