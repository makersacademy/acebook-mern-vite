import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AudioButton from "../../components/AudioButton/AudioButton";
import Question from "../../components/Question/Question";
import Answer from "../../components/Answer/Answer";
import { artistAnswers } from "../../../helpers/answer_generator";
import GenrePicker from "../../components/GenrePicker/GenrePicker";

export const QuizPage = () => {
  const [shuffledArtistAnswerList, setShuffledArtistAnswerList] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [selectedBackground, setSelectedBackground] =
    useState("custom-background");
  const [questionNumber, setQuestionNumber] = useState(1);
  const navigate = useNavigate();
  const [interactionDisabled, setInteractionDisabled] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleAnswerButtonClick = () => {
    setInteractionDisabled(true);
    setQuestionNumber(questionNumber + 1);
  };

  useEffect(() => {
    setAnimate(false);

    if (questionNumber <= 5) {
      artistAnswers(selectedGenre).then(
        ({ selectedTrack, shuffledArtistAnswerList }) => {
          setShuffledArtistAnswerList(shuffledArtistAnswerList);
          setSelectedTrack(selectedTrack);
          setInteractionDisabled(false);
          setAnimate(true);
        }
      );
    } else {
      setTimeout(() => {
        navigate("/results");
      }, 750);
    }
  }, [selectedGenre, questionNumber, navigate]);

  const handleGenrePicker = (genreID, backgroundClass) => {
    setSelectedGenre(genreID);
    setSelectedBackground(backgroundClass);
  };

  return (
    <>
      <div
        className={
          "min-h-screen relative overflow-hidden custom-background bg-cover"
        }
      >
        {selectedGenre === 0 ? (
          <div>
            <GenrePicker onGenreSelect={handleGenrePicker}></GenrePicker>
          </div>
        ) : (
          <>
            <div
              className={
                `absolute inset-0 flex flex-col items-center justify-center 
              animate__animated animate__slideInRight ${selectedBackground} bg-cover`
                // The above Tailwind code applies the sliding animation to the transition from the genre 'page' to the quiz 'page'
              }
            >
              <div
                className={`${
                  animate ? "animate__animated animate__slideInRight" : ""
                }`}
              >
                <div
                  className="text-2xl text-white"
                  hidden={interactionDisabled}
                >
                  Question {questionNumber} of 5
                </div>
                <div className="p-5">
                  <AudioButton trackPreview={selectedTrack.preview} />
                </div>
                <div className={`p-5 text-2xl`}>
                  <Question questionType="artist" />
                </div>
                <div className={`p-5`}>
                  <Answer
                    shuffledArtistAnswerList={shuffledArtistAnswerList}
                    selectedTrack={selectedTrack}
                    onAnswerButtonClick={handleAnswerButtonClick}
                    interactionDisabled={interactionDisabled}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
