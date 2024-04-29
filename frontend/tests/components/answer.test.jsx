import { render, screen, fireEvent } from "@testing-library/react";
import Answer from "../../src/components/Answer/Answer";
import "@testing-library/jest-dom"


describe("Answer", () => {
    test('All answers shown on page', () => {
        const selectedTrack = {artist: "correct-answer"};
        const shuffledArtistAnswerList = ['Artist 1' , 'Artist 2', 'Artist 3', 'correct-answer'];
        render(<Answer selectedTrack={selectedTrack} shuffledArtistAnswerList={shuffledArtistAnswerList} />);
        shuffledArtistAnswerList.forEach(artist => {
            expect(screen.getByText(artist)).toBeInTheDocument()
        })
    });

    test('Button changes to green when correct answer is clicked', () => {
        const selectedTrack = {artist: "correct-answer"};
        const shuffledArtistAnswerList = ['Artist 1' , 'Artist 2', 'Artist 3', 'correct-answer'];
        render(<Answer selectedTrack={selectedTrack} shuffledArtistAnswerList={shuffledArtistAnswerList} />);
        fireEvent.click(screen.getByText('correct-answer'))
        expect(screen.getByText('correct-answer')).toHaveClass('bg-green-500')
    })

    test('Button changes to red when incorrect answer is clicked', () => {
        const selectedTrack = {artist: "correct-answer"};
        const shuffledArtistAnswerList = ['Artist 1' , 'Artist 2', 'Artist 3', 'correct-answer'];
        render(<Answer selectedTrack={selectedTrack} shuffledArtistAnswerList={shuffledArtistAnswerList} />);
        fireEvent.click(screen.getByText('Artist 1'))
        expect(screen.getByText('Artist 1')).toHaveClass('bg-red-500')
        fireEvent.click(screen.getByText('Artist 2'))
        expect(screen.getByText('Artist 2')).toHaveClass('bg-red-500')
        fireEvent.click(screen.getByText('Artist 3'))
        expect(screen.getByText('Artist 3')).toHaveClass('bg-red-500')
    })

    test('Score is 0 at the start', () => {
        const selectedTrack = {artist: "correct-answer"};
        const shuffledArtistAnswerList = ['Artist 1' , 'Artist 2', 'Artist 3', 'correct-answer'];
        render(<Answer selectedTrack={selectedTrack} shuffledArtistAnswerList={shuffledArtistAnswerList} />);
        expect(screen.getByText("Your Score: 0")).toBeInTheDocument()
    })

    test('Score is updated to 1 when correct answer is clicked', () => {
        const selectedTrack = {artist: "correct-answer"};
        const shuffledArtistAnswerList = ['Artist 1' , 'Artist 2', 'Artist 3', 'correct-answer'];
        render(<Answer selectedTrack={selectedTrack} shuffledArtistAnswerList={shuffledArtistAnswerList} />);
        fireEvent.click(screen.getByText('correct-answer'))
        expect(screen.getByText("Your Score: 1")).toBeInTheDocument()
    })

    test('Score stays at 0 when incorrect answer is clicked', () => {
        const selectedTrack = {artist: "correct-answer"};
        const shuffledArtistAnswerList = ['Artist 1' , 'Artist 2', 'Artist 3', 'correct-answer'];
        render(<Answer selectedTrack={selectedTrack} shuffledArtistAnswerList={shuffledArtistAnswerList} />);
        fireEvent.click(screen.getByText('Artist 1'))
        expect(screen.getByText("Your Score: 0")).toBeInTheDocument()
    })
})