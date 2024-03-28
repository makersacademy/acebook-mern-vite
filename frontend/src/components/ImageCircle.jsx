export const ImageCircle = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-5">
          <img
            className="image-circle"
            src={props.image}
            alt="people on a log eating watermelon"
            aria-label="picture of people on a log eating watermelon"
          />
        </div>
        <div className="col-7"></div>
      </div>
    </div>
  );
};
