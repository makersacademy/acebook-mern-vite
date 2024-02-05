/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Post from "../../src/components/Post/Post";

describe("Post", () => {
  test("displays the message as an article", () => {
    const testPost = { _id: "123", message: "test message" };
    render(<Post post={testPost} />);

    // const article = screen.getByRole("article");
    expect(screen.getByText(/test message/i)).toBeInTheDocument();
  });
});
