import { useState } from "react";

const Answer = ({ selectedTrack, shuffledArtistAnswerList }) => {
    const [score, setScore] = useState(0);

    // console.log(selectedTrack.artist)
    const answerClick = (artist, id) => {
        const isCorrect = selectedTrack.artist === artist
        console.log(isCorrect)
        if (isCorrect) {
            setScore(score + 1);
            document.getElementById(`button-${id}`).style.backgroundColor = "green";
        } else {
            document.getElementById(`button-${id}`).style.backgroundColor = "red";
        }
    };


    return (
        <>
        <div>
        {shuffledArtistAnswerList.map((artist, id) => (
            <ul key={id}>
                <button id={`button-${id}`} className="answer-button" onClick={() => answerClick(artist, id)}>{artist}</button>
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


