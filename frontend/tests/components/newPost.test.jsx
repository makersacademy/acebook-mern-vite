import { render, screen, fireEvent} from "@testing-library/react";

import NewPost from "../../src/components/Post/newPost";

describe("newPost", () => {
    
    test('types into the textbox', () => {
        render(<NewPost/>);
        const textbox = screen.getByRole('textbox');
        fireEvent.change(textbox, { target: { value: 'Hello, world!' } });
        expect(textbox.value).toBe('Hello, world!');
    });

});
