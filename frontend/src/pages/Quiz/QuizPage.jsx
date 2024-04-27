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
    setSelectedGenre(genreID);
  };


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
            <div className={`absolute inset-0 flex flex-col items-center justify-center 
            animate__animated animate__slideInRight`
            // The above Tailwind code applies the sliding animation to the transition from the genre 'page' to the quiz 'page'
            }>
              <div className="p-5">
                <AudioButton trackPreview={selectedTrack.preview} />
              </div>
              <div className="p-5 text-2xl">
                <Question questionType="artist" />
              </div>
              <div className="p-5">
                <Answer shuffledArtistAnswerList={shuffledArtistAnswerList} selectedTrack={selectedTrack} />
              </div>

            </div>
          </>
        )}
    </>
  );

};
