import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProfilePage } from "../../src/pages/Profile/ProfilePage";

import { vi } from "vitest";

vi.mock("../../src/services/users", () => {
  const getUserMock = vi.fn();
  return { getUser: getUserMock };
});

vi.mock("../../src/services/posts", () => {
  const getPostsMock = vi.fn();
  return { getPosts: getPostsMock };
});

import ListOfPosts from "../../src/components/ListOfPosts";


describe("Profile Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("It displays a page heading", async () => {
    window.localStorage.setItem("token", "testToken");
    render( 
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    const heading = await screen.findByTestId("profilePage-h1");
    //console.log(heading)
    expect(heading.textContent).toEqual("Welcome to your profile!");
  });



});


describe("ListOfPosts component", () => {
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
        dateCreated: "2024-10-07T15:00:07.120Z",
        noOfLikes: "20",
    },
  ];

  test("renders multiple posts correctly - usernames in chrological order", () => {
        render(<ListOfPosts posts={mockPosts} />);
        const post = screen.getAllByTestId("user-link");
        expect(post[0].textContent).toEqual("Alexia")
        expect(post[2].textContent).toEqual("Marion")
        expect(post[1].textContent).toEqual("Alexia")
    });

  test("renders multiple posts correctly - message in chrological order", () => {
        render(<ListOfPosts posts={mockPosts} />);
        const post = screen.getAllByTestId("message");
        expect(post[0].textContent).toEqual("Test message")
        expect(post[2].textContent).toEqual("Test message 2")
        expect(post[1].textContent).toEqual("Test message 3")
    });

    test("renders multiple posts correctly - date created in chrological order", () => {
        render(<ListOfPosts posts={mockPosts} />);
        const post = screen.getAllByTestId("dateCreated");
        expect(post[0].textContent).toEqual("1:00pm - 07.10.24")
        expect(post[1].textContent).toEqual("3:00pm - 07.10.24")
        expect(post[2].textContent).toEqual("9:31am - 08.10.24")
    });

    test("renders multiple posts correctly - likes in chrological order", () => {
        render(<ListOfPosts posts={mockPosts} />);
        const post = screen.getAllByTestId("numberOfLikes");
        expect(post[0].textContent).toEqual("15 Likes")
        expect(post[2].textContent).toEqual("16 Likes")
        expect(post[1].textContent).toEqual("20 Likes")
    });
});
