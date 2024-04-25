import AudioButton from "../../components/AudioButton/AudioButton";
import Question from "../../components/Question/Question";

export const QuizPage = () => (
  <>
    <div>
      <AudioButton />
    </div>
    <div>
      <Question questionType="artist" />
    </div>
  </>
);
