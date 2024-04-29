const Question = ({ questionType }) => {
  return (
    <>
      <div className="text-question-text-color"
      style={{ marginBottom: '10px' }} >
        {`What is the name of the ${questionType}?`}
      </div>
    </>
  );
};

export default Question;
