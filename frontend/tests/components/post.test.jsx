import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Post from "../../src/components/Post/Post";

describe("Post", () => {
    test("displays the message as an article", () => {
        const testPost = { _id: "123", message: "test message", username: "user1", reg_time: "2024-02-01T12:29:41.763+00:00"};
        render(<Post post={testPost} />);

        const article = screen.getByRole("article");
        expect(article.textContent).toBe("test messageuser1 01/02/2024 12:29");
    });
});
