const Question = ({ questionType, hidden }) => {
  return (
    <>
      <div
        className="text-question-text-color"
        style={{ marginBottom: "10px" }}
        hidden={hidden}
      >
        {`What is the name of the ${questionType}?`}
      </div>
    </>
  );
};

export default Question;
