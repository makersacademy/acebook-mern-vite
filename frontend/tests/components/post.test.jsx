import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Post from "../../src/components/Post/Post";

describe("Post", () => {
    test("displays the message as an article", () => {
        const testPost = { _id: "123", message: "test message", user: [{_id: "1234", email: "email1@email.com", password: "123", username: "user1", profilePic: "Pic"}], reg_time: "2024-02-01T12:29:41.763+00:00"};
        render(<Post post={testPost} />);

        const article = screen.getByRole("article");
        expect(article.textContent).toBe("test messagePosted at: 01/02/2024 12:29Likes: 0");
    });
});

