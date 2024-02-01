import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Post from "../../src/components/Post/Post";

describe("Post", () => {
    test("displays the message as an article", () => {
        const testPost = { _id: "123", message: "test message" };
        render(<Post post={testPost} />);

        const article = screen.getByRole("article");
        expect(article.textContent).toBe("test message");
    });
    // test("Contains a link to the Post", () => {
    //     const testPost = { _id: "123", message: "test message" };
    //     render(<Post post={testPost} />);
    
    //     const link = screen.getByRole("link");
    //     expect(link.textContent).toBe("test message");
    // });
});

