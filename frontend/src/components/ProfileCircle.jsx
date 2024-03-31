export const ProfileCircle = (props) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-5">
          <img
            className="image-circle pt-5"
            src={props.profileImage}
            alt="profile picture"
            aria-label="circular picture of profile picture"
          />
        </div>{" "}
      </div>{" "}
    </div>
  );
};
