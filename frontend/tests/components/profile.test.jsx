import { render, screen } from "@testing-library/react";
import Profile from "../../src/components/Profile/Profile";

describe("Profile", () => {
    test("displays the user as an article", () => {
        const testUser = {_id: "123", username: "user1", email: "email1@email.com" };
        render(<Profile user = {testUser} />);
        const article = screen.getByRole("article");
        expect(article.textContent).toBe(`Username: user1Email: email1@email.com`);
    })
})