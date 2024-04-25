import { useState } from "react";

const Answer = ({ selectedTrack, shuffledArtistAnswerList }) => {
    const [score, setScore] = useState(0);
    // console.log(selectedTrack.artist)
    const answerClick = (artist) => {
        const isCorrect = selectedTrack.artist === artist
        console.log(isCorrect)
        if (isCorrect) {
            setScore(score + 1);
        }
    };



    return (
        <>
        <div>
        {shuffledArtistAnswerList.map((artist, id) => (
            <ul key={id}>
                <button onClick={() => answerClick(artist)}>{artist}</button>
            </ul>
        ))}
        </div>
        <div>
            <h1 className="results-header">Results</h1>
            <p>Your Score: {score}</p>
        </div>
        </>
    )
};


export default Answer;


