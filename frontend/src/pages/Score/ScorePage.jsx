import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaderboard } from "../../components/Score/Leaderboard";
import { ScorePosting } from "../../components/Score/ScorePosting";

export const ScorePage = () => {
    const [score, setScore] = useState(null);
    const [genreID, setGenreId] = useState(null);
    const [bonus, setBonus] = useState(null);
    const [perfectRoundBonus, setPerfectRoundBonus] = useState(null);
    const [totalScore, setTotalScore] = useState(0);
    const [reloadLeaderboard, setReloadLeaderboard] = useState(false);
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
        if (storedScore === 500) {
            setPerfectRoundBonus(250);
        } else {
            setPerfectRoundBonus(0);
        }
        
        setTotalScore(parseInt(storedScore) + parseInt(storedBonus));
    }, []);

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

const rating = getRating(score, genreID);

const handleGoBack = () => {
    navigate("/kwizical");
};

return (
    <>
    <div className="flex flex-col items-center p-8">
        <h1>Total Score Breakdown</h1>
        <h1>Round Score: {score}</h1>
        <h1>Perfect Round Bonus: {perfectRoundBonus}</h1>
        <h1>Speed Bonus: {bonus}</h1>
        <h1>Your Score: {totalScore}</h1>

        <p>Rating: {rating}</p>
        <div>
            <button onClick={handleGoBack} className={`items-center justify-center bg-box-color hover:bg-hover-color hover:text-hover-text-color text-text-color font-bold w-40 h-40 
            rounded-lg shadow-md flex transition duration-300 
            ease-in-out transform hover:scale-105`}>Play Again!</button>
        </div>
    </div>
    <ScorePosting score={totalScore} reloadLeaderboard={reloadLeaderboard} setReloadLeaderboard={setReloadLeaderboard}/>
    <Leaderboard reloadLeaderboard={reloadLeaderboard}/>
    </>
);
};

export default ScorePage;