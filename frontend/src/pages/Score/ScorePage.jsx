import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
            if (genreID === 116) { // Hip Hop
                return "Do you even know where Brooklyn is?";
            } else if (genreID === 113) { // Dance
                return "Do you even move your feet?";
            } else if (genreID === 132) { // Pop
                return "Do you even moonwalk?";
            } else if (genreID === 165) { // RnB
                return "You can't even slow dance!";
            } else if (genreID === 173) { // Films/Games
                return "Do you even have a TV?";
            } else if (genreID === 464) { // Metal
                return "You're clearly a groupie";
            }

        } else if (score === 300) {
            if (genreID === 116) { // Hip Hop
                return "Not bad 25 Cent";
            } else if (genreID === 113) { // Dance
                return "You can do better two stepper!";
            } else if (genreID === 132) { // Pop
                return "You can do better moonwalks!";
            } else if (genreID === 165) { // RnB
                return "Keep singing in the shower";
            } else if (genreID === 173) { // Films/Games
                return "TV's nowadays have colors";
            } else if (genreID === 464) { // Metal
                return "Not bad, but you're out of tune!";
            }

        } else {
            if (genreID === 116) { // Hip Hop
                return "Keep spitting those bars!";
            } else if (genreID === 113) { // Dance
                return "Great! You got the moves!";
            } else if (genreID === 132) { // Pop
                return "Oh yeah! It's Britney b*$^&!";
            } else if (genreID === 165) { // RnB
                return "You're hitting the right keys Alicia!";
            } else if (genreID === 173) { // Films/Games
                return "You wrote the script for success!";
            } else if (genreID === 464) { // Metal
                return "You're a true Metal Head!";
            }

        }
        return "Default rating message";
    };

    const totalScore = score + bonus + perfectRoundBonus;

    const rating = getRating(score, genreID);

    const handleGoBack = () => {
        navigate("/kwizical");
    };

    return (
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
    );
};

export default ScorePage;