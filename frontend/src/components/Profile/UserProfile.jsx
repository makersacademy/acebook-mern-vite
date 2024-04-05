

export const User = (props) => {
  return (
    <div className="card-body darkest-text-color">
      <div className="row">
        <div className="col-sm-3 fw-bold">
          <p className="mb-0">Username:</p>
        </div>
        <div className="col-sm-9">
          <p className="text-muted mb-0">{props.user.username}</p>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-sm-3  fw-bold">
          <p className="mb-0">Description:</p>
        </div>
        <div className="col-sm-9">
          <p className="text-muted mb-0">{props.user.description}</p>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-sm-3 fw-bold">
          <p className="mb-0">DOB:</p>
        </div>
        <div className="col-sm-9">
          <p className="text-muted mb-0">{props.user.dob}</p>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-sm-3 fw-bold">
          <p className="mb-0">Location:</p>
        </div>
        <div className="col-sm-9">
          <p className="text-muted mb-0">{props.user.location}</p>
        </div>
      </div>
    </div>
  );
};
