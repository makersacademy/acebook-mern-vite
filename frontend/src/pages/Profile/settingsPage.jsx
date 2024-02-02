import React, { useState, useEffect } from "react";
import { getUser, updateUser, deleteUser } from "../../services/user";
import Navbar from "../../components/Post/Navbar";
import "./profilePage.css";
import { useNavigate} from "react-router-dom";

export const SettingsPage = () => {
  document.title = "Settings Page";

  const [user, setUser] = useState({});
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const id = window.localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    getUser(token, id)
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token, id]);

  const handleUpdateName = async () => {
    try {
      const updatedUser = await updateUser(token, id, { full_name: user.full_name });
      setUser((prevUser) => ({ ...prevUser, full_name: updatedUser.full_name }));
      console.log("Name updated successfully", updatedUser);
    } catch (error) {
      console.error("Error updating Name", error);
    }
  };

  const handleUpdateEmail = async () => {
    try {
      const updatedUser = await updateUser(token, id, { email: user.email });
      setUser((prevUser) => ({ ...prevUser, email: updatedUser.email }));
      console.log("Email updated successfully", updatedUser);
    } catch (error) {
      console.error("Error updating email", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
        deleteUser(token, id);
        console.log("User deleted");
        navigate("/")
    }
    catch (error) {
        console.error("Error deleting user" + error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="settings">
        <h1>Settings</h1>

        {/* Form for updating username */}
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Update Full Name:
            <input
              type="text"
              value={user.full_name || ""}
              onChange={(e) => setUser((prevUser) => ({ ...prevUser, full_name: e.target.value }))}
            />
          </label>
          <button onClick={handleUpdateName}>Update Name</button>
        </form>

        {/* Form for updating email */}
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Update Email:
            <input
              type="email"
              value={user.email || ""}
              onChange={(e) => setUser((prevUser) => ({ ...prevUser, email: e.target.value }))}
            />
          </label>
          <button onClick={handleUpdateEmail}>Update Email</button>
        </form>
        <button onClick={handleDeleteUser}>Delete Account</button>
      </div>
    </>
  );
};
