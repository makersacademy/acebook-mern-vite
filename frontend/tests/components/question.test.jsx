import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Question from "../../src/components/Question/Question";

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
    expect(screen.queryByText("What is the name of the album?")).toBeInTheDocument();
  });
});
