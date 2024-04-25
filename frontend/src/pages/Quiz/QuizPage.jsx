import { useState, useEffect } from "react";
import AudioButton from "../../components/AudioButton/AudioButton";
import Question from "../../components/Question/Question";
import Answer from "../../components/Answer/answer";
import { artistAnswers } from "../../../helpers/answer_generator";  

export const QuizPage = () => {
  const [shuffledArtistAnswerList, setShuffledArtistAnswerList] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState("");
  
  
  useEffect(() => {
    artistAnswers().then(({selectedTrack, shuffledArtistAnswerList}) => {
      setShuffledArtistAnswerList(shuffledArtistAnswerList);
      setSelectedTrack(selectedTrack);
    })
  }, []);
  
  return (
    <>
      <div>
        <AudioButton trackPreview={selectedTrack.preview}/>
      </div>
      <div>
        <Question questionType="artist" />
      </div>
      <div>
        <Answer shuffledArtistAnswerList={shuffledArtistAnswerList} selectedTrack={selectedTrack} />
      </div>
    </>
  );
};
