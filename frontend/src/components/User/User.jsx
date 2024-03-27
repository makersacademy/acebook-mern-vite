const User = (props) => {

    return (
      <div key={props.user._id}>
        <div><img src="./src/assets/placeholder_image.jpg" alt="PlaceHolderImage" /></div>
        <div>{props.user.firstName}</div>
        <div>{props.user.lastName}</div>
        <div>{props.user.bio}</div>
      </div>
    );
  };
  
  export default User;
