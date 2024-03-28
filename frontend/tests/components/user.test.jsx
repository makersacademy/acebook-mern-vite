import { render, screen } from "@testing-library/react";

import User from "../../src/components/User/User";

describe("User Profile", () => {
  test("User Profile displays firstName correctly", () => {
    const testUser = { email: 'Example email', password: 'Example password', firstName: 'Example First Name', lastName: "Example Last Name", bio: "Example bio"};
    render(<User user={testUser} />); 

    const profileFirstName = screen.getByTestId("profileFirstName");
    expect(profileFirstName.textContent).toBe("Example First Name");
    });

    test("User Profile displays last name correctly", () => {
        const testUser = { email: 'Example email', password: 'Example password', firstName: 'Example First Name', lastName: "Example Last Name", bio: "Example bio"};
        render(<User user={testUser} />);     
        
        const profileLastName = screen.getByTestId("profileLastName");
        expect(profileLastName.textContent).toBe("Example Last Name");
    });

    test("User Profile displays bio correctly", () => {
        const testUser = { email: 'Example email', password: 'Example password', firstName: 'Example First Name', lastName: "Example Last Name", bio: "Example bio"};
        render(<User user={testUser} />);  

        const profileBio = screen.getByTestId("profileBio");
        expect(profileBio.textContent).toBe("Example bio");
    });
});
