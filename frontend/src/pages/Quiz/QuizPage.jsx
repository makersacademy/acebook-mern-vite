import { useState, useEffect } from "react";
import AudioButton from "../../components/AudioButton/AudioButton";
import Question from "../../components/Question/Question";
import Answer from "../../components/Answer/Answer";
import { artistAnswers } from "../../../helpers/answer_generator";
import GenrePicker from "../../components/GenrePicker/GenrePicker";

export const QuizPage = () => {
  const [shuffledArtistAnswerList, setShuffledArtistAnswerList] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState("");

  const [selectedGenre, setSelectedGenre] = useState(0);

  const handleGenrePicker = (genreID) => {
    setSelectedGenre(genreID)
    console.log(genreID)
  }


  useEffect(() => {
    artistAnswers(selectedGenre).then(({ selectedTrack, shuffledArtistAnswerList }) => {
      setShuffledArtistAnswerList(shuffledArtistAnswerList);
      setSelectedTrack(selectedTrack);
    })
  }, [selectedGenre]);

  return (
    <>
      {selectedGenre === 0
        ? (<div>
          <GenrePicker onGenreSelect={handleGenrePicker}></GenrePicker>
        </div>)
        : (
          <>
            <div>
              <AudioButton trackPreview={selectedTrack.preview} />
            </div>
            <div>
              <Question questionType="artist" />
            </div>
            <div>
              <Answer shuffledArtistAnswerList={shuffledArtistAnswerList} selectedTrack={selectedTrack} />
            </div>
          </>
        )}
    </>
  );
};
