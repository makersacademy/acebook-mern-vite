import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../src/components/Button";

describe("Button component", () => {
    //will check that our button apprears on the screen with the Click me child (text).
    it("renders with default variant", () => {
        render(<Button>Click me</Button>);
        const button = screen.getByText("Click me");
        expect(button).toBeInTheDocument();
    });

    //ensures that a cancel button is disabled when needed to.
    it("renders an application of confirm, its styling and handle clicks", () => {
        const handleClick = jest.fn(); //we're creating a pretend (fake function) that we can track. 
        //fn means function
        render(<Button variant="confirm" onClick={handleClick}>Confirm</Button>);
        const button = screen.getByText("Confirm");
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalled();
    });

    it("renders an application of cancel, its styling and disables the button", () => {
        render(<Button variant="cancel" disabled>Cancel</Button>);
        const button = screen.getByText("Cancel");
        expect(button).toBeDisabled();
    });
});

//render -displays the componet in our test
//screen accessed elements in the rendered output
//fireEvent is the one that simulates the clicks