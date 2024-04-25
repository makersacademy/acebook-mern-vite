import { screen, render } from "@testing-library/react";

import Question from "../../src/components/Question/Question";

describe("Question component", () => {
  test("Question displays on the page", () => {
    render(<Question questionType="artist" />);
    expect(screen.getByText("What is the name of the artist?")).toBeTruthy();
  });
});
