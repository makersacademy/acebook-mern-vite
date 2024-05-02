import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import totalscore from "../../assets/totalscore.png"
import leaderboard from "../../assets/leaderboard.png"

export const ScorePage = () => {
    const [score, setScore] = useState(null);
    const [genreID, setGenreId] = useState(null);
    const [bonus, setBonus] = useState(null);
    const [perfectRoundBonus, setPerfectRoundBonus] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const genreID = localStorage.getItem("genreID");
        if (genreID) {
            setGenreId(parseInt(genreID));
        }
        const storedScore = localStorage.getItem("score");
        if (storedScore) {
            setScore(parseInt(storedScore));
        }
        const storedBonus = localStorage.getItem("bonus");
        if (storedBonus) {
            setBonus(parseInt(storedBonus));
        }
    }, []);

    useEffect(() => {
        if (score === 500) {
            setPerfectRoundBonus(250);
        } else {
            setPerfectRoundBonus(0);
        }
    }, [score]);

    const getRating = (score, genreID) => {
            if (score <= 200) {
                switch (genreID) {
                    case 116: // Hip Hop
                        return "Do you even know where Brooklyn is?";
                    case 113: // Dance
                        return "Do you even move your feet?";
                    case 132: // Pop
                        return "Do you even moonwalk?";
                    case 165: // RnB
                        return "You can't even slow dance!";
                    case 173: // Films/Games
                        return "Do you even have a TV?";
                    case 464: // Metal
                        return "You're clearly a groupie";
                    default:
                        return "Default rating message";
                }
            } else if (score >= 300 && score < 500) {
                switch (genreID) {
                    case 116: // Hip Hop
                        return "Not bad 25 Cent";
                    case 113: // Dance
                        return "You can do better two stepper!";
                    case 132: // Pop
                        return "You can do better moonwalks!";
                    case 165: // RnB
                        return "Keep singing in the shower";
                    case 173: // Films/Games
                        return "TV's nowadays have colors";
                    case 464: // Metal
                        return "Not bad, but you're out of tune!";
                    default:
                        return "Default rating message";
                }
            } else if (score === 500) {
                switch (genreID) {
                    case 116: // Hip Hop
                        return "Keep spitting those bars!";
                    case 113: // Dance
                        return "Great! You got the moves!";
                    case 132: // Pop
                        return "Oh yeah! It's Britney b*$^&!";
                    case 165: // RnB
                        return "You're hitting the right keys Alicia!";
                    case 173: // Films/Games
                        return "You wrote the script for success!";
                    case 464: // Metal
                        return "You're a true Metal Head!";
                    default:
                        return "Default rating message";
                }
            }
        }

const totalScore = score + bonus + perfectRoundBonus;

const rating = getRating(score, genreID);

const handleGoBack = () => {
    navigate("/kwizical");
};

return (
    <div className="min-h-screen relative overflow-hidden bg-homepage-background-1 bg-full">
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="flex flex-col w-3/4 h-3/4 rounded-lg bg-dark-purple bg-opacity-50 border-navy-border border-8 overflow-x-auto p-2">
        <div className="overflow-x-auto flex flex-col sm:flex-row items-center sm:items-start w-full sm:h-3/4">
          <div className="flex flex-col items-center h-max-1/3 sm:w-1/2">
            <div className="flex">
              <img
                src={totalscore}
                alt="Total-score-logo"
                className="sm:max-h-60 max-h-16 m-4 sm:m-8"
              />
            </div>
            <div className="sm:p-8 sm:space-y-4 space-y-1">
            <h1>Round Score: {score}</h1>
            <h1>Perfect Round Bonus: {perfectRoundBonus}</h1>
            <h1>Speed Bonus: {bonus}</h1>
            <h1 className="font-black">Your Score: {totalScore}</h1>
            </div>
            
          </div>
          <div className="sm:border-r border-navy-border h-full"></div>
          <div className="flex flex-col items-center sm:w-1/2 p-2">
            <div className="flex">
              <img
                src={leaderboard}
                alt="Leaderboard-logo"
                className="w-full sm:max-h-60 max-h-16 m-4 sm:pb-4"
              />
            </div>
            <div className="overflow-x-auto">
            <table className=" table-auto border-collapse border-navy-border bg-dark-purple bg-opacity-50">
    <thead>
      <tr>
        <th className="border border-navy-border px-2 py-2">Ranking</th>
        <th className="border border-navy-border px-2 py-2">Name</th>
        <th className="border border-navy-border px-2 py-2">Score</th>
      </tr>
    </thead>
    <tbody>
      {/* Rows */}
      <tr>
        <td className="border border-navy-border px-2 py-1"> 1 </td>
        <td className="border border-navy-border px-2 py-1">Player 1</td>
        <td className="border border-navy-border px-2 py-1">1000</td>
      </tr>
      <tr>
        <td className="border border-navy-border px-2 py-1">2</td>
        <td className="border border-navy-border px-2 py-1">Player 2</td>
        <td className="border border-navy-border px-2 py-1">950</td>
      </tr>
      <tr>
        <td className="border border-navy-border px-2 py-1">3</td>
        <td className="border border-navy-border px-2 py-1">Player 3</td>
        <td className="border border-navy-border px-2 py-1">900</td>
      </tr>
      <tr>
        <td className="border border-navy-border px-2 py-1">4</td>
        <td className="border border-navy-border px-2 py-1">Player 4</td>
        <td className="border border-navy-border px-2 py-1">700</td>
      </tr>
      <tr>
        <td className="border border-navy-border px-2 py-1">5</td>
        <td className="border border-navy-border px-2 py-1">Player 5</td>
        <td className="border border-navy-border px-2 py-1">250</td>
      </tr>
    </tbody>
  </table>
          </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center mt-auto sm:border-t border-navy-border p-4">
  <p className="mb-4 text-2xl font-bold sm:font-extrabold">{rating}</p>
  <div className="flex items-center">
    <button onClick={handleGoBack} className={`items-center justify-center bg-hot-pink text-navy font-semibold  w-60 h-10 
      rounded-lg shadow-md shadow-indigo-950 hover:shadow-none flex transition duration-300 
      ease-in-out transform`}>Play Again!</button>
  </div>
</div>
      </div>
    </div>
  </div>
);
};

export default ScorePage;