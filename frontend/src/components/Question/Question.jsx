
const Question = ({ questionType }) => {

  const whichQuestion = (questionType) => {
    console.log(questionType)
    if (questionType === 0) {
      return "What is the name of the track?"
    } else if (questionType === 1) {
      return "What is the name of the artist?"
    } else {
      return "What is the name of the album?"
    }
  }
  return (
    <>
      <div className="text-question-text-color"
      style={{ marginBottom: '10px' }} >
        {whichQuestion(questionType)}
      </div>
    </>
  );
};

export default Question;
