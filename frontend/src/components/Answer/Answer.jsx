import { useState } from "react";

const Answer = ({ selectedTrack, shuffledArtistAnswerList}) => {
  const [score, setScore] = useState(0);
  const [buttonColors, setButtonColors] = useState(new Array(4).fill("bg-box-color")); // creates an array of button colours, set to blue initially

  // console.log(selectedTrack.artist)
  const answerClick = (answer, id) => {
    const isCorrect = (selectedTrack.title === answer) || (selectedTrack.artist === answer) || (selectedTrack.album === answer);
    const newButtonColors = [...buttonColors];
    if (isCorrect) {
      setScore(score + 1);
      newButtonColors[id] = 'bg-correct-color';
    } else {
      newButtonColors[id] = 'bg-incorrect-color';
    }
    setButtonColors(newButtonColors);
  };


  return (
    <>
      <div className={`grid grid-cols-1 gap-y-2 md:grid-cols-2 gap-x-40`}> {/* 'grid grid-cols-2' this turns the row of answers into two columns. Adding md: applies the changes only when the screen is wider than the md breakpoint*/}
        {shuffledArtistAnswerList.map((answer, id) => (
            <button
              key={id}
              onClick={() => answerClick(answer, id)}
              className={`btn overflow-hidden relative
                w-64 text-text-color py-4 px-4 rounded-xl font-bold uppercase rounded-lg shadow-md hover:text-hover-text-color
                before:block before:absolute before:h-full before:w-full
                before:left-0 before:top-0 before:-translate-y-full before:transition-transform ${buttonColors[id]}  
                ${buttonColors[id] === 'bg-box-color' ? 'hover:bg-hover-color' : ''} 
            `}>
              {answer}
            </button>
        ))}
      </div>
      <div className="mt-8">
        <h1 className="results-header text-2xl font-bold text-question-text-color">Results</h1>
        <p className="text-question-text-color" 
        >Your Score: {score}</p>
      </div>
    </>
  )

};


export default Answer;


