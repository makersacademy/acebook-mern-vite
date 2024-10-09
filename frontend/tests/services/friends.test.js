import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi } from "vitest";
import { addFriend, getFriends, getNonFriendUsers } from "../../src/services/friends";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

createFetchMock(vi).enableMocks();

describe("add friend", () => {
  test("includes a token & user info with its request", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ message: "added friend", token: "newToken" }),{status: 200,}
    );

    const userId = 123;
    await addFriend("testToken", userId);

    const fetchArguments = fetch.mock.lastCall;
    const url = fetchArguments[0];
    const options = fetchArguments[1];

    expect(url).toEqual(`${BACKEND_URL}/friends?userId=123`);
    expect(options.method).toEqual("POST");
    expect(options.headers["Authorization"]).toEqual("Bearer testToken");
  });
});
describe("get friends", () => {
  test("includes a token &with its request", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ friends: [] , token: "newToken" }),{status: 200,}
    );

    await getFriends("testToken");

    const fetchArguments = fetch.mock.lastCall;
    const url = fetchArguments[0];
    const options = fetchArguments[1];

    expect(url).toEqual(`${BACKEND_URL}/friends`);
    expect(options.method).toEqual("GET");
    expect(options.headers["Authorization"]).toEqual("Bearer testToken");
  });
});
describe("get non friends", () => {
  test("includes a token &with its request", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ users: [] , token: "newToken" }),{status: 200,}
    );

    await getNonFriendUsers("testToken");

    const fetchArguments = fetch.mock.lastCall;
    const url = fetchArguments[0];
    const options = fetchArguments[1];

    expect(url).toEqual(`${BACKEND_URL}/friends/non`);
    expect(options.method).toEqual("GET");
    expect(options.headers["Authorization"]).toEqual("Bearer testToken");
  });
});

