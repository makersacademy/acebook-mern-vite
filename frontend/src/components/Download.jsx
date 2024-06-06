import axios from "axios";
import { useEffect, useState } from "react";

const Download = ({ imageSize }) => {
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/routes/profileUpload/uploads/beach.jpg", {
        headers: {
          "Content-Type": "application/json, charset=UTF-8",
          Accept: "application/json, text/html",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setImage("http://localhost:3000" + response.data.path);
      });
  }, [image, token]);

  return (
    <div className="container" id="container">
      {image && (
        <img
          className="profile_img"
          id="img"
          style={{ width: imageSize, height: "auto" }}
          src={
            "http://localhost:3000/api/routes/profileUpload/uploads/beach.jpg"
          }
          alt="img"
        />
      )}
    </div>
  );
};

export default Download;
