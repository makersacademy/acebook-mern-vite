import { useState } from "react";

const Answer = ({ selectedTrack, shuffledArtistAnswerList }) => {
    const [score, setScore] = useState(0);

    // console.log(selectedTrack.artist)
    const answerClick = (artist, id) => {
        const isCorrect = selectedTrack.artist === artist
        console.log(isCorrect)
        const button = document.getElementById(`button-${id}`)
        if (isCorrect) {
            setScore(score + 1);
            button.style.backgroundColor = "green";
            button.style.color = "white"
        } else {
            button.style.backgroundColor = "red";
            button.style.color = "white"
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


