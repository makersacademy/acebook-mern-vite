
// this will hold the component that loops through each connection and produces a card for each one...
export const Connection = () => {
    return (
<div className="row">
<div className="col-lg-4 d-flex align-items-stretch">
  <div className="card">
    {/* <img src="./images/idea.png" className="card-img-top" alt="a lightbulb on a chalkboard" aria-label="a lightbulb on a chalkboard to symbolise an idea"> */}
    <div className="card-body">
      <h5 className="card-title">Sam12356</h5>
      <h5 className="card-title">Sam</h5>
      <h5 className="card-title">Smith</h5>
      <p className="card-text"></p>
      <button>View friend</button>
    </div>
    </div>
  </div>
</div> 
);
};