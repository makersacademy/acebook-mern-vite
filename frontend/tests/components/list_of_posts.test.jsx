import { render, screen } from "@testing-library/react";
import ListOfPosts from "../../src/components/ListOfPosts";



describe("ListOfPosts", () => {
  const mockPosts = [
    { _id: "1",
      message: "Test message",
      user: {
      username: "Alexia",
      },
      dateCreated: "2024-10-07T13:00:07.120Z",
      noOfLikes: "15",
    },
    {_id: "2",
        message: "Test message 2",
        user: {
          username: "Marion",
        },
        dateCreated: "2024-10-08T09:31:00.120Z",
        noOfLikes: "16",
    },
    {_id: "3",
        message: "Test message 3",
        user: {
            username: "Alexia",
        },
        dateCreated: "2024-09-07",
        noOfLikes: "20",
    },
  ];
  
    test("renders multiple posts correctly - usernames", () => {
        render(<ListOfPosts posts={mockPosts} />);
        const post = screen.getAllByTestId("username");
        expect(post[0].textContent).toEqual("Alexia")
        expect(post[1].textContent).toEqual("Marion")
        expect(post[2].textContent).toEqual("Alexia")
    });

  test("renders multiple posts correctly - message", () => {
        render(<ListOfPosts posts={mockPosts} />);
        const post = screen.getAllByTestId("message");
        expect(post[0].textContent).toEqual("Test message")
        expect(post[1].textContent).toEqual("Test message 2")
        expect(post[2].textContent).toEqual("Test message 3")
    });

    test("renders multiple posts correctly - date created", () => {
        render(<ListOfPosts posts={mockPosts} />);
        const post = screen.getAllByTestId("dateCreated");
        expect(post[0].textContent).toEqual("1:00pm - 07.10.24")
        expect(post[1].textContent).toEqual("9:31am - 08.10.24")
        expect(post[2].textContent).toEqual("12:00am - 07.09.24")
    });

    test("renders multiple posts correctly - likes", () => {
        render(<ListOfPosts posts={mockPosts} />);
        const post = screen.getAllByTestId("numberOfLikes");
        expect(post[0].textContent).toEqual("15")
        expect(post[1].textContent).toEqual("16")
        expect(post[2].textContent).toEqual("20")
    });
});
