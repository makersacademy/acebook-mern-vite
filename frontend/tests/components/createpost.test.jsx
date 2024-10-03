import { render, screen } from "@testing-library/react";
import CreatePost from "../../src/components/CreatePost";

import userEvent from '@testing-library/user-event';

describe("Create Post Component" , () => {
    beforeEach(() => {
        window.localStorage.removeItem("token");
    });

    // Reuseable function to handle typing into the field.
    async function typeInArea(text) {
        const user = userEvent.setup();

        const textarea = screen.getByTitle("MessageBox");
        await user.type(textarea, text);
    }

    test("Component renders", () => {
        render(
            <CreatePost/>
        );

        const title = screen.getByText("Create a Post");
        
        expect(title).to.exist;
    });

    test("Can type in textarea" , async () => {
        render(
            <CreatePost/>
        );

        await typeInArea("Hello world");
        const textarea = screen.getByTitle("MessageBox");
        expect(textarea.value).to.equal("Hello world");
        
    });

    test("Can't type more than 500 characters", async () => {
        render(
            <CreatePost/>
        );

        // Create a 600 length string without making it look horrible.
        let largeString = "";
        for (let i = 0; i < 600; i++){
            largeString += "e";
        }

        await typeInArea(largeString);

        await typeInArea("Hello world");
        const textarea = screen.getByTitle("MessageBox");
        expect(textarea.value.length).to.equal(500);
        
    });

    test("Word Counter works", async () => {
        render(
            <CreatePost/>
        );

        await typeInArea("Hello world");
        const counter = screen.getByText("11/500")
        expect(counter).to.exist;

    })

    test("Counter reaches a max of 500 characters", async () => {
        render(
            <CreatePost/>
        );

        // Create a 600 length string without making it look horrible.
        let largeString = "";
        for (let i = 0; i < 600; i++){
            largeString += "e";
        }

        await typeInArea(largeString);
        const counter = screen.getByText("500/500");
        expect(counter).to.exist;

    });

});