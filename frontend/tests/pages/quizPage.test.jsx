import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { QuizPage } from "../../src/pages/Quiz/QuizPage";
import { describe, vi } from "vitest";
import "@testing-library/jest-dom"


beforeAll(() => {
    vi.mock("../../helpers/answer_generator", () => {
        const mockAnswers = vi.fn();
        mockAnswers.mockResolvedValue({
            selectedTrack: {
                title: "Correct Track Title",
                artist: "Correct Artist",
                album: { title: "Correct Album Title" },
                preview: "examplePreviewUrl"
            },
            shuffledArtistAnswerList: ['Artist 1' , 'Artist 2', 'Artist 3', 'Correct Artist'],
            questionType: 1
        });
        return {
            answers: () => mockAnswers()
        };
    });
});


describe("Audio button component", () => {
    test("Play button is accessible on the page", () => {
        render(<QuizPage />);
        fireEvent.click(screen.getByText("Pop"));
        const playButton = screen.getByRole("button");
        expect(playButton.textContent).toBe("▶");
    });

    test("Pause button is accessible on the page", () => {
        render(<QuizPage />);
        fireEvent.click(screen.getByText("Pop"));
        const playButton = screen.getByRole("button");
        fireEvent.click(playButton);
        expect(playButton.textContent).toBe("❚❚");
    });

    test("AudioButton changes state to play when clicked", () => {
        render(<QuizPage />);
        fireEvent.click(screen.getByText("Pop"));
        const playButton = screen.getByRole("button");
        fireEvent.click(playButton);
        fireEvent.click(playButton);
        expect(playButton.textContent).toBe("▶");
    });
});



describe("Question component", () => {
    test("Question displays on page", async () => {
        render(<QuizPage />);
        fireEvent.click(screen.getByText("Pop"));
        await waitFor(() => expect(screen.queryByText("What is the name of the artist?")).toBeInTheDocument());
    });
});

describe("Answer component", () => {
    test("All answers are shown on the page", async () => {
        render(<QuizPage />);
        fireEvent.click(screen.getByText("Pop"));
        await waitFor(() => screen.getByText("Artist 1"));
        expect(screen.getByText("Artist 1")).toBeInTheDocument();
        expect(screen.getByText("Artist 2")).toBeInTheDocument();
        expect(screen.getByText("Artist 3")).toBeInTheDocument();
        expect(screen.getByText("Correct Artist")).toBeInTheDocument();
    });

    test("Button changes to green when correct answer is clicked on the page", async () => {
        render(<QuizPage />);
        fireEvent.click(screen.getByText("Pop"));
        await waitFor(() => screen.getByText("Artist 1"));
        fireEvent.click(screen.getByText('Correct Artist'))
        expect(screen.getByText('Correct Artist')).toHaveClass('bg-correct-color')
    })

    test("Button changes to red when incorrect answer is clicked on the page", async () => {
        render(<QuizPage />);
        fireEvent.click(screen.getByText("Pop"));
        await waitFor(() => screen.getByText("Artist 1"));
        fireEvent.click(screen.getByText('Artist 1'))
        expect(screen.getByText('Artist 1')).toHaveClass('bg-incorrect-color')
        fireEvent.click(screen.getByText('Artist 2'))
        expect(screen.getByText('Artist 2')).toHaveClass('bg-incorrect-color')
        fireEvent.click(screen.getByText('Artist 3'))
        expect(screen.getByText('Artist 3')).toHaveClass('bg-incorrect-color')
    })
});

