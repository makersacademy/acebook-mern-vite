import { render, screen } from "@testing-library/react";

import Post from "../../src/components/Post/Post";

import { sub } from 'date-fns';

describe("Post", () => {
  test("displays the message as an article", () => {
    const testPost = { _id: "123", message: "test message", post_date: '2024-04-02T09:40:18.010Z' };
    render(<Post post={testPost} />);

    const message = screen.getByTestId("message");
    expect(message.textContent).toContain("test message");
  });

  test("displays the post date - less than a minute ago", () => {
    const dateNow  = new Date();
    const thirtySecsAgo = sub(dateNow, {seconds: 30});
    const testPost = { _id: "123", message: "test message", post_date: thirtySecsAgo };
    render(<Post post={testPost} />);
    const timeAgo = screen.getByTestId("time-ago");
    expect(timeAgo.textContent).toBe("Less than a minute ago");
  });

  test("displays the post date 10 minutes ago", () => {
    const dateNow  = new Date();
    const thirtySecsAgo = sub(dateNow, {minutes: 10});
    const testPost = { _id: "123", message: "test message", post_date: thirtySecsAgo };
    render(<Post post={testPost} />);
    const timeAgo = screen.getByTestId("time-ago");
    expect(timeAgo.textContent).toBe("10 minutes ago");
  });
  test("displays the post date 10 hours ago", () => {
    const dateNow  = new Date();
    const thirtySecsAgo = sub(dateNow, {hours: 10});
    const testPost = { _id: "123", message: "test message", post_date: thirtySecsAgo };
    render(<Post post={testPost} />);
    const timeAgo = screen.getByTestId("time-ago");
    expect(timeAgo.textContent).toBe("10 hours ago");
  });

  test("displays a specific post date over a day ago", () => {
    const testPost = { _id: "123", message: "test message", post_date: "2024-04-01T09:40:18.010Z" };
    render(<Post post={testPost} />);
    const timeAgo = screen.getByTestId("time-ago");
    expect(timeAgo.textContent).toBe("1st April 2024, 10:40");
  });

});
