export const ProfileCircle = (props) => {
  return (
    <div className="container">
      <div className="row justify-content-start">
        <div className="col-4">
          <img
            className="image-circle-smaller mt-5"
            src={props.profileImage}
            alt="profile picture"
            aria-label="circular picture of profile picture"
          />
          </div>
          <div className="col-8 mt-5 d-flex align-items-center justify-contents-center"> 
          <h2 className="fw-light">Welcome back, see your current and pending connections below!</h2>
          </div>
        </div>
      </div>
  );
};
