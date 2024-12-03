import { getMyPhoto } from "../services/photos";
import { useState, useEffect } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import "../assets/App.css"

export function PhotoDisplay({ photoLoad, showDefaultImage }) {
  const [photoFilePath, setPhotoFilePath] = useState("");
  // const [photoSrc, setPhotoSrc] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    getMyPhoto(token)
      .then((data) => {
        console.log(data);
        setPhotoFilePath(`${data.filePath}`);
        localStorage.setItem("token", data.token);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [photoLoad]);

  console.log("show default image", showDefaultImage);

  return (
    <div>
      {/* <p>{`${BACKEND_URL}/${photoFilePath}`}</p> */}
      {showDefaultImage ? (
        <img className="image" src="../../public/user.png" width="300"></img>
      ) : (
        <img className="image" src={`${BACKEND_URL}/${photoFilePath}`} width="300"></img>
      )}
      {/* <img src="../../public/user.png" width="300"></img>
      <img src={`${BACKEND_URL}/${photoFilePath}`} width="300"></img> */}
    </div>
  );
}
