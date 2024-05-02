import { screen, render } from "@testing-library/react";
import Question from "../../src/components/Question/Question";
import "@testing-library/jest-dom";

describe("Question component", () => {
  test("Question is generated for track title", () => {
    render(<Question questionType={0} />);
    expect(screen.queryByText("What is the name of the track?")).toBeInTheDocument();
  });

  test("Question is generated for artist name", () => {
    render(<Question questionType={1} />);
    expect(screen.queryByText("What is the name of the artist?")).toBeInTheDocument();
  });

  test("Question is generated for album title", () => {
    render(<Question questionType={2} />);
    expect(screen.queryByText("What is the name of the album this track is on?")).toBeInTheDocument();
  });

  test("Question is generated for release date", () => {
    render(<Question questionType={3} />);
    expect(screen.queryByText("In what year was this song released?")).toBeInTheDocument();
  });
});
