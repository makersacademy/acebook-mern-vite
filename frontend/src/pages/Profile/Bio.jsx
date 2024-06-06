import "./Profile.css";
// import DOMpurify from "dompurify";

const Bio = ({ bio, setBio, username }) => {
  const handleBioChange = (event) => {
    setBio(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("hi");
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
        <form onClick={handleSubmit}>
          <input
            placeholder="type your new bio"
            id="bio"
            type="text"
            value={bio}
            onChange={handleBioChange}
          />

          <button>update bio</button>
        </form>
      </div>
    </div>
  );
};

export default Bio;
