import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QuizPage } from "../../src/pages/Quiz/QuizPage";

describe("Question", () => {
  test("displays the message correctly", () => {
    render(
      <BrowserRouter>
        <QuizPage />
      </BrowserRouter>
    );
    const elementWithMessage = screen.getByText(
      "What is the name of the artist?"
    );
    expect(elementWithMessage).toBeInTheDocument();
  });
});
