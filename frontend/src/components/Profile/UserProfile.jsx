
export const User = (props) => {
  return (
  <div className="container">
    <div className="row">
      <div className="col-3"></div>
      <div className="col-6">
      <article aria-label="User Header" key={props.user._id}>{props.user.forename} {props.user.surname} Username: {props.user.username}</article>
      </div>
      <div className="col-7" aria-label="User description">
        <article key={props.user._id}>Description:{props.user.description}</article>
      </div>
    </div>
    <div className="row">
      <div className="col-3"></div>
      <div className="col-7 ">
      <article aria-label="User text" key={props.user._id}>Location: {props.user.location}</article>
      </div>
    </div>
    <div className="col-7" aria-label="User description">
        <article key={props.user._id}>date of birth: {props.user.dob}</article>
      </div>
    <hr />
  </div>
  );
};
