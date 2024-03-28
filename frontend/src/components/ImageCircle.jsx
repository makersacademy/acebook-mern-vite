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
        <div className="col-2"></div>

        <div className="col-5 d-flex align-items-center">
          <form className=" p-5 rounded border border-3 border-primary">
            <div className="row ">
              <label htmlFor="email" className="form-label col-3 g-3 mb-3">
                Email
              </label>
              <div className="col-9">
                <input
                  type="email"
                  className="form-control "
                  id="email"
                  placeholder="whoever@wherever.com"
                ></input>
              </div>
            </div>
            <div className="row">
              <label htmlFor="email" className="form-label col-3 g-3 mb-3">
                Password
              </label>
              <div className="col-9">
                <input
                  type="email"
                  className="form-control "
                  id="email"
                  placeholder="whoever@wherever.com"
                ></input>
              </div>
            </div>
            <div className="row justify-content-between">
              <button type="submit" className="btn btn-primary custom-button mb-3 col-5 darkest-bg-color lightest-text-color">
                Login
              </button>
              <button type="submit" className="btn btn-primary custom-button mb-3 col-5 darkest-bg-color lightest-text-color">
                Forgot password
              </button>
            </div>
            <div className="row">
              <button type="submit" className="btn btn-primary custom-button mb-3 col-12 darkest-bg-color lightest-text-color">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
