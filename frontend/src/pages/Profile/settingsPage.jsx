import React, { useState, useEffect } from "react";
import { getUser, updateUser, deleteUser } from "../../services/user";
import Navbar from "../../components/Post/Navbar";
import "./profilePage.css";
import { useNavigate } from "react-router-dom";

export const SettingsPage = () => {
  document.title = "Settings Page";

  const [user, setUser] = useState({});
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const id = window.localStorage.getItem("id");
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
  });

  useEffect(() => {
    getUser(token, id)
      .then((data) => {
        setUser(data.user);
        setFormData({
          full_name: data.user.full_name,
          email: data.user.email,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  
    // Clear success message after a certain time
    let timer;
    if (successMessage) {
      timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000); 
    }
  
    return () => clearTimeout(timer);
  
  }, [token, id, successMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const updatedUser = await updateUser(token, id, { updatedUserData: formData });
      setUser(updatedUser);
      setSuccessMessage("Profile updated successfully");
      console.log("User updated successfully", updatedUser);
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(token, id);
      console.log("User deleted");
      navigate("/");
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="settings">
        <h1>Settings</h1>

        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* Form for updating user */}
        <form onSubmit={(e) => e.preventDefault()} class="form-settings">
          <label class="label-settings">
            Change Name:
          </label>
          <label class="label-settings">
            <input
              type="text"
              name="full_name"
              placeholder={`${user.full_name}`}
              value={formData.full_name}
              onChange={handleInputChange}
              class="input-settings"
            />
          </label>

          <label class="label-settings">
            Change Email:
          </label>
          <label class="label-settings">
            <input
              type="email"
              name="email"
              placeholder={`${user.email}`}
              value={formData.email}
              onChange={handleInputChange}
              class="input-settings"
            />
          </label>

          <button onClick={handleUpdate} class="button-settings">Save</button>
        </form>

        <button onClick={handleDeleteUser} class="delete-button">Delete Account</button>
      </div>
    </>
  );
};
