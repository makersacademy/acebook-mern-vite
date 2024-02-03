import { useState } from "react";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const NewPostForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const token = window.localStorage.getItem("token");
  

  const handleSubmit = () => {
    let datetime = new Date().toLocaleString("en-GB")

      let payload = {
        message,
        datetime,

      };


    fetch(`${BACKEND_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    navigate("/posts");
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label hmtlFor="message">
        Message:
        <input type="text" onChange={handleChange} data-testid="post-input" />
      </label>
      <label>
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </label>
    </form>
  );
};

export default NewPostForm;
