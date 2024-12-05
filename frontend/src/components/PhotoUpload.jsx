import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function PhotoUpload({ triggerPhotoLoad }) {
  const [photo, setPhoto] = useState(null);

  // const [allPhoto, setAllPhoto] = useState();

  useEffect(() => {
    getPhoto();
  }, []);

  const submitPhoto = async (e) => {
    e.preventDefault();
    console.log("submitting photo");

    // setShowDefaultImage(false);

    const formData = new FormData();
    formData.append("photo", photo);

    const token = localStorage.getItem("token");
    // eslint-disable-next-line no-unused-vars
    const result = await axios.post(`${BACKEND_URL}/photo`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    triggerPhotoLoad();
  };

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setPhoto(e.target.files[0]);
  };

  const getPhoto = async () => {
    const result = await axios.get(`${BACKEND_URL}`);
    console.log(result);
    // setAllPhoto(result.data.data);
  };

  return (
    <>
      <form onSubmit={submitPhoto}>
        <label htmlFor="image">Upload Profile Photo</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          // value={image ? image.name : ""}
          onChange={onInputChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      {/* {allPhoto.map(data => {
            return <img src={require(`../photos/${data.photo}`)}/>;
        })} */}
    </>
  );
}
