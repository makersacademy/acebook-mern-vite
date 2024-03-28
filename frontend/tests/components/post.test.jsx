import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import Post from "../../src/components/Post/Post";

describe("Post", () => {
  test("displays the message as an article", () => {
    const testPost = { _id: "123", message: "test message" };
    render(<Post post={testPost} />);

    const article = screen.getByRole("article");
    expect(article.textContent).toBe("test message");
  });
});

test("displays all correctly", () => {
  const testPost = {
    _id: "123",
    message: "test message",
    date: "25/03/2024, 12:55:34",
  };

  render(<Post post={testPost} />);

  const article = screen.getByRole("article");
  expect(article.textContent).toContain("test message");

  expect(article.textContent).toContain("25/03/2024, 12:55:34");
});

test("displays image", () => {
  const testPost = {
    _id: "123",
    message: "test message",
    date: "25/03/2024, 12:55:34",
    image: "../../assets/image.jpg",
  };

  render(<Post post={testPost} />);

  expect(screen.getByAltText("123")).toHaveAttribute("src", testPost.image);
  expect(screen.getByAltText("123")).toHaveAttribute("alt", testPost._id);
});
