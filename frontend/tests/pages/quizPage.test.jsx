import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { QuizPage } from "../../src/pages/Quiz/QuizPage";
import { describe, vi } from "vitest";
import "@testing-library/jest-dom"


beforeAll(() => {
    vi.mock("../../helpers/answer_generator", () => {
        const mockArtistAnswers = vi.fn();
        mockArtistAnswers.mockResolvedValue({
            selectedTrack: { artist: 'correct-answer', preview: "examplePreviewUrl" },
            shuffledArtistAnswerList: ['Artist 1' , 'Artist 2', 'Artist 3', 'correct-answer']
        });
        return {
            artistAnswers: () => mockArtistAnswers()
        };
    });
});


describe("Audio button component", () => {
    test("Play button is accessible on the page", () => {
        render(<QuizPage />);
        const playButton = screen.getByRole("button");
        expect(playButton.textContent).toBe("▶");
    });

    test("Pause button is accessible on the page", () => {
        render(<QuizPage />);
        const playButton = screen.getByRole("button");
        fireEvent.click(playButton);
        expect(playButton.textContent).toBe("❚❚");
    });

    test("AudioButton changes state to play when clicked", () => {
        render(<QuizPage />);
        const playButton = screen.getByRole("button");
        fireEvent.click(playButton);
        fireEvent.click(playButton);
        expect(playButton.textContent).toBe("▶");
    });
});


describe("Question component", () => {
    test("Question displays on page", () => {
        render(<QuizPage />);
        expect(screen.getByText("What is the name of the artist?")).toBeTruthy();
    });
});


describe("Answer component", () => {
    test("All answers are shown on the page", async () => {
        render(<QuizPage />);
        await waitFor(() => screen.getByText("Artist 1"));
        expect(screen.getByText("Artist 1")).toBeInTheDocument();
        expect(screen.getByText("Artist 2")).toBeInTheDocument();
        expect(screen.getByText("Artist 3")).toBeInTheDocument();
        expect(screen.getByText("correct-answer")).toBeInTheDocument();
    });

    test("Button changes to green when correct answer is clicked on the page", async () => {
        render(<QuizPage />);
        await waitFor(() => screen.getByText("Artist 1"));
        fireEvent.click(screen.getByText('correct-answer'))
        expect(screen.getByText('correct-answer')).toHaveClass('bg-green-500')
    })

    test("Button changes to red when incorrect answer is clicked on the page", async () => {
        render(<QuizPage />);
        await waitFor(() => screen.getByText("Artist 1"));
        fireEvent.click(screen.getByText('Artist 1'))
        expect(screen.getByText('Artist 1')).toHaveClass('bg-red-500')
        fireEvent.click(screen.getByText('Artist 2'))
        expect(screen.getByText('Artist 2')).toHaveClass('bg-red-500')
        fireEvent.click(screen.getByText('Artist 3'))
        expect(screen.getByText('Artist 3')).toHaveClass('bg-red-500')
    })
});

