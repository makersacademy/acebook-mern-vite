export const ProfilePageImage = (props) => {
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
          </div>
        </div>
    );
  };
  