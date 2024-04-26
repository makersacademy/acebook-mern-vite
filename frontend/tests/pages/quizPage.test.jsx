import { screen, render, fireEvent } from "@testing-library/react";
import { QuizPage } from "../../src/pages/Quiz/QuizPage";
import { vi } from "vitest";


beforeAll(() => {
    vi.mock("../../helpers/answer_generator", () => {
        const mockShuffledArtistAnswerList = vi.fn();
        mockShuffledArtistAnswerList.mockResolvedValue([
            { artistName: 'Artist 1', isCorrect: true },
            { artistName: 'Artist 2', isCorrect: false },
            { artistName: 'Artist 3', isCorrect: false },
        ]);
        return {
            artistAnswers: async () => ({
                selectedTrack: { preview: "examplePreviewUrl" },
                shuffledArtistAnswerList: await mockShuffledArtistAnswerList(),
            }),
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

