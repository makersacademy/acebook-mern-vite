const Username = (props) => {

    return (
      <div key={props.user._id}>
        <div>{props.user.firstName} {props.user.lastName}</div>
     </div>
    );
  };
  
  export default Username;
