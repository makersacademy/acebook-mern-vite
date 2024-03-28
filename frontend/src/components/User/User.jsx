const User = (props) => {

  return (
    <div key={props.user._id}>
      <div data-testid="profileImage" className="profileImage"><img src="./src/assets/placeholder_image.jpg" alt="PlaceHolderImage" /></div>
      <div data-testid="profileFirstName" className="profileFirstName">{props.user.firstName}</div>
      <div data-testid="profileLastName" className="profileLastName">{props.user.lastName}</div>
      <div data-testid="profileBio" className="profileBio" >{props.user.bio}</div>
    </div>
  );
};

export default User;