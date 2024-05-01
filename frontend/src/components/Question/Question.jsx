
const Question = ({ questionType, hidden }) => {

  const whichQuestion = (questionType) => {
    console.log(questionType)
    if (questionType === 0) {
      return "What is the name of the track?"
    } else if (questionType === 1) {
      return "What is the name of the artist?"
    } else if (questionType === 2) {
      return "What is the name of the album this track is on?"
    } else if (questionType === 3) {
    return "In what year was this song released?"
  }
 
  }
  return (
    <>
      <div className="text-question-text-color"
      style={{ marginBottom: '10px', display: hidden ? 'none' : 'block' }} >
        {whichQuestion(questionType)}
      </div>
    </>
  );
};

export default Question;
