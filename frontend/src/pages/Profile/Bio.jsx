import "./Profile.css";

// import "./bio.css";
import { useState } from "react";
// import { updateMyBio } from "../../services/updateBio";
import { updateProfile } from "../../services/updateProfile";

import DOMPurify from "dompurify";

const Bio = ({ bio, setBio, username }) => {
  const [newbio, setNewBio] = useState("");
  const handleBioChange = (event) => {
    setNewBio(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const sanitizedBio = DOMPurify.sanitize(newbio);


    try {
      await updateProfile(token, { bio: sanitizedBio }).then(
        (data) => console.log("!!data:", data, "sanatized bio: ", sanitizedBio),
        setBio(sanitizedBio),
        setNewBio("")
        
      );

      // location.reload();
    } catch (err) {
      console.error(err);
    }
    // const CleanBio = DOMpurify.sanitize(bio);
  };
  return (
    <div>
      <h3>My Username: </h3>
      <p className="bio"> {username}</p>
      <br />
      <div className="bio_container">
        <h4>My Bio:</h4>
        <p className="bio"> {bio}</p>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="type your new bio"
            id="bio"
            type="text"
            value={newbio}
            onChange={handleBioChange}
          />

          <button type="submit">update bio</button>
        </form>
      </div>
    </div>
  );
};

export default Bio;
