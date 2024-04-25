import { screen, render, fireEvent } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
import { QuizPage } from "../../src/pages/Quiz/QuizPage";

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
