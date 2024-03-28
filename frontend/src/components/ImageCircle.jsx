export const ImageCircle = (props) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-5">
          <img
            className="image-circle pt-5"
            src={props.image}
            alt="people on a log eating watermelon"
            aria-label="picture of people on a log eating watermelon"
          />
        </div>
        <div className="col-7">
          <form className="row g-3 p-5">
            <div className="col-auto">
              <label htmlFor="staticEmail2" className="visually-hidden">
                Email
              </label>
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="staticEmail2"
                value="email@example.com"
              />
            </div>
            <div className="col-auto">
              <label htmlFor="inputPassword2" className="visually-hidden">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword2"
                placeholder="Password"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-3">
                Confirm identity
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
