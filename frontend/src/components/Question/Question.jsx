const Question = ({ questionType }) => {
  return (
    <>
      <div className="question"
      style={{ marginBottom: '10px' }} >
        {`What is the name of the ${questionType}?`}
      </div>
    </>
  );
};

export default Question;
