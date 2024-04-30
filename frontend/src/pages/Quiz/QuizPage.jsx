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
  const [time, setTime] = useState(0);
  const [playButtonState, setPlayButtonState] = useState (false)
  const [selectedBackground, setSelectedBackground] =
    useState("custom-background");
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const navigate = useNavigate();

  const handleAnswerButtonClick = () => {
    setQuestionsAnswered(questionsAnswered + 1);
    setPlayButtonState(false)
    if (questionsAnswered === 4) {
      setTimeout(() => {
        navigate("/score");
      }, 750);
    }
  };

  const handlePlayPause = () => {
    setPlayButtonState(!playButtonState);
     //When play is pressed, sets to isplaying. When pressed again, sets to !isplaying
   
  } 

  useEffect(() => {
    if (questionsAnswered < 5) {
      setTime(0);
      artistAnswers(selectedGenre).then(
        ({ selectedTrack, shuffledArtistAnswerList }) => {
          setShuffledArtistAnswerList(shuffledArtistAnswerList);
          setSelectedTrack(selectedTrack);
        }
      );
    }
  }, [selectedGenre, questionsAnswered]);

  useEffect(() => {
    let interval;
    if (playButtonState) {
      interval = setInterval(() => {
        setTime(prevTimer => {
          console.log("Timer updated:", prevTimer + 1); // Log the updated timer value
          return prevTimer + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [playButtonState]);



  const handleGenrePicker = (genreID, backgroundClass) => {
    setSelectedGenre(genreID);
    setSelectedBackground(backgroundClass);
    localStorage.setItem('genreID', genreID); //Adding genreID to LocalStorage to get it in ScorePage

  };

  return (
    <>
      {selectedGenre === 0 ? (
        <div className="min-h-screen custom-background bg-cover">
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
            <div className="text-2xl text-white">
              Question {questionsAnswered + 1} of 5
            </div>
            <div className="p-5">
              <AudioButton trackPreview={selectedTrack.preview} onPlayPause={handlePlayPause} playButtonState={playButtonState} />
            </div>
            <div className="p-5 text-2xl">
              <Question questionType="artist" />
            </div>
            <div className="p-5">
              <Answer
                shuffledArtistAnswerList={shuffledArtistAnswerList}
                selectedTrack={selectedTrack}
                onAnswerButtonClick={handleAnswerButtonClick}
                time={time}
              />
            </div>
   
          </div>
        </>
      )}
    </>
  );
};
