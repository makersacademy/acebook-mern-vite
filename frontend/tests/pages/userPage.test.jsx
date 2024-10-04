import UserPage from "../../src/pages/User/UserPage";
import { MemoryRouter, Route } from "react-router-dom";
import { vi } from "vitest";
import { getUser }from "../../src/services/users";
import { Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
vi.mock("../../src/services/users", () => {
  const getUserMock = vi.fn()
  return {getUser: getUserMock}
})

describe("UserPage", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });
  
  test("given a url the user is taken to a page and a username is displayed", async () => {
    window.localStorage.setItem("token", "testToken");
    // given /user/1234 the api should return the user object and the page 
    // should display that user's username in the userPage component

    // step 1: mock getUser returns user object
    await getUser.mockResolvedValue({
      user: {
        username: "testuser1",
      },
      token: "newToken"
    })
    // step 2: go to url
    render(
      <MemoryRouter initialEntries={['/user/1234']}>
        <Routes>
          <Route path='/user/:userId' element={<UserPage />}/>
        </Routes>
      </MemoryRouter>
    )
    // step 3: assert getUser was called with id of 1234
    expect(getUser).toHaveBeenCalledWith("testToken","1234")
    
    // step 4: assert username on page matches user object
    const username = await screen.findByTestId("username-heading")
    expect(username.textContent).toEqual("testuser1's Profile")
  })
  
})