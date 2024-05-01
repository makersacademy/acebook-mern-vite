import { screen, render } from "@testing-library/react";
import Question from "../../src/components/Question/Question";
import "@testing-library/jest-dom";

describe("Question component", () => {
  test("Question is generated", () => {
    render(<Question questionType="artist" />);
    expect(screen.getByText("What is the name of the artist?")).toBeTruthy();
  });

  test("Question is hidden from view", () => {
    render(<Question questionType="artist" hidden={true} />);
    const questionElement = screen.getByText("What is the name of the artist?");
    expect(questionElement).toHaveStyle({ display: "none" });
  });
});
