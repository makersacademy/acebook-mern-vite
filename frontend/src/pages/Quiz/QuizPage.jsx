import { useState, useEffect } from "react";
import AudioButton from "../../components/AudioButton/AudioButton";
import Question from "../../components/Question/Question";
import Answer from "../../components/Answer/Answer";
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ padding: '20px' }}>
        <AudioButton trackPreview={selectedTrack.preview}/>
      </div>
      <div style={{ padding: '20px', fontSize: '24px' }}>
        <Question questionType="artist" />
      </div>
      <div style={{ padding: '20px' }}>
        <Answer shuffledArtistAnswerList={shuffledArtistAnswerList} selectedTrack={selectedTrack} />
      </div>
      </div>
    </>
  );
 
};
