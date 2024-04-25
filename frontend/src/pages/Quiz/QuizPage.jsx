// import { useState, useEffect } from "react";
import AudioButton from "../../components/AudioButton/AudioButton";
import Question from "../../components/Question/Question";
// import { getTrack } from "../../services/deezerService";
export const QuizPage = () => {
  // const [track, setTrack] = useState({});
  // // useEffect(() => {
  // //   getTrack().then((data) => {
  // //     setTrack(data);
  // //   });
  // // }, []);
  return (
    <>
      <div>
        <AudioButton />
      </div>
      <div>
        <Question questionType="artist" />
      </div>
    </>
  );
};
