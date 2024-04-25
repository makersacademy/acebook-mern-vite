import React from "react"


const Answer = ( { shuffledArtistAnswerList }) => {
    return (
        <div>
        {shuffledArtistAnswerList.map((artist, id) => (
            <ul key={id}>
                <button>{artist}</button>
            </ul>
        ))}
        </div>
    )
};

export default Answer;


