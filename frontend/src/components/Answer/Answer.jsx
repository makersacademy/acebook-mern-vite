import { useState } from "react";

const Answer = ({ selectedTrack, shuffledArtistAnswerList }) => {
  const [score, setScore] = useState(0);
  const [buttonColors, setButtonColors] = useState(new Array(4).fill("bg-blue-500")); // creates an array of button colours, set to blue initially

  // console.log(selectedTrack.artist)
  const answerClick = (artist, id) => {
    const isCorrect = selectedTrack.artist === artist
    const newButtonColors = [...buttonColors];
    if (isCorrect) {
      setScore(score + 1);
      newButtonColors[id] = 'bg-green-500';
    } else {
      newButtonColors[id] = 'bg-red-500';
    }
    setButtonColors(newButtonColors);
  };


  return (
    <>
      <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 gap-x-40"> {/* 'grid grid-cols-2' this turns the row of answers into two columns. Adding md: applies the changes only when the screen is wider than the md breakpoint*/}
        {shuffledArtistAnswerList.map((artist, id) => (
            <button
              key={id}
              onClick={() => answerClick(artist, id)}
              className={`btn overflow-hidden relative
                w-64 text-white py-4 px-4 rounded-xl font-bold uppercase
                before:block before:absolute before:h-full before:w-full
                before:left-0 before:top-0 before:-translate-y-full before:transition-transform ${buttonColors[id]} 
                ${buttonColors[id] === 'bg-blue-500' ? 'hover:bg-blue-300' : ''} 
            `}>
              {artist}
            </button>
        ))}
      </div>
      <div className="mt-8">
        <h1 className="results-header text-2xl font-bold">Results</h1>
        <p>Your Score: {score}</p>
      </div>
    </>
  )

};


export default Answer;


