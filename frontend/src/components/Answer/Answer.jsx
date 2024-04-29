import { useState } from "react";

const Answer = ({
  selectedTrack,
  shuffledArtistAnswerList,
  onAnswerButtonClick,
}) => {
  const [score, setScore] = useState(0);
  const [buttonColors, setButtonColors] = useState(
    new Array(4).fill("bg-blue-500")
  );

  const answerClick = (artist, id) => {
    const isCorrect = selectedTrack.artist === artist;
    const newButtonColors = [...buttonColors];
    if (isCorrect) {
      setScore(score + 1);
      newButtonColors[id] = "bg-green-500";
    } else {
      newButtonColors[id] = "bg-red-500";
    }
    setButtonColors(newButtonColors);
    onAnswerButtonClick();

    setTimeout(() => {
      setButtonColors(new Array(4).fill("bg-blue-500"));
    }, 400);
  };

  return (
    <>
      <div>
        {shuffledArtistAnswerList.map((artist, id) => (
          <ul key={id}>
            <button
              onClick={() => answerClick(artist, id)}
              className={`btn overflow-hidden relative
                w-64 bg-blue-500 text-white py-4 px-4 rounded-xl font-bold uppercase
                before:block before:absolute before:h-full before:w-full
                before:left-0 before:top-0 before:-translate-y-full before:transition-transform ${
                  buttonColors[id]
                }
                ${
                  buttonColors[id] === "bg-blue-500" ? "hover:bg-blue-300" : ""
                }`}
              style={{ marginBottom: "10px" }}
            >
              {artist}
            </button>
          </ul>
        ))}
      </div>
      <div>
        <h1 className="results-header" style={{ marginTop: "20px" }}>
          Results
        </h1>
        <p>Your Score: {score}</p>
      </div>
    </>
  );
};

export default Answer;
