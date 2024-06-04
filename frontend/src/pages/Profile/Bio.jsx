import "./bio.css";
// import DOMpurify from "dompurify";

const Bio = ({ bio, setBio, username }) => {
  const handleBioChange = (event) => {
    setBio(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const CleanBio = DOMpurify.sanitize(bio);
  };
  return (
    <div>
      <h3>Username: {username} </h3>
      <div>
        <p className="bio">Bio: {bio}</p>
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
