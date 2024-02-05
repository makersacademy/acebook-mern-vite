import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi, test, it, beforeEach } from "vitest";

import { getAllComments, createComment } from "../../src/services/comments";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

// Mocking local storage
// https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests
const localStorageMock = (function () {
    let store = {};
    return {
        getItem(key) {
            return store[key] || null;
        },
        setItem(key, value) {
            store[key] = value.toString();
        },
        clear() {
            store = {};
        },
    };
})();

Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
});

describe("createComment service", () => {
    beforeEach(() => {
        window.localStorage.clear();
        fetch.resetMocks();
    });

    it("No token is found", async () => {
        await expect(createComment("Hello")).rejects.toThrow(
            "No token found. User must be logged in."
        );
    });

    it("No message content", async () => {
        window.localStorage.setItem("token", "some-token");
        const response = await createComment("");
        expect(response).toEqual({
            status: 200,
            message: "comments must not be blank",
        });
    });

    it("returns response object on successful fetch", async () => {
        window.localStorage.setItem("token", "some-token");
        const mockResponse = { id: 1, content: "Hello" };

        fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 201 });

        const response = await createComment("Hello");
        expect(response).toEqual(mockResponse);
    });

    it("throws an error when fetch fails", async () => {
        window.localStorage.setItem("token", "some-token");

        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

        await expect(createComment("Hello")).rejects.toThrow(
            "Received status 500 when creating comment. Expected 201"
        );
    });
});

describe("getAllComments", () => {
    test("includes a token with its request", async () => {
        const mockResponse = { id: 1, content: "Hello", token: "newToken" };
        fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

        await getAllComments(1, "testToken");

        // This is an array of the arguments that were last passed to fetch
        const fetchArguments = fetch.mock.lastCall;
        const url = fetchArguments[0];
        const options = fetchArguments[1];

        expect(url).toEqual(`${BACKEND_URL}/comments/${mockResponse.id}`);
        expect(options.method).toEqual("GET");
        expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    });

    it("rejects with an error if the status is not 200", async () => {
        fetch.mockResponseOnce(
            JSON.stringify({ message: "Something went wrong" }),
            { status: 400 }
        );

        try {
            await getAllComments("testToken");
        } catch (err) {
            expect(err.message).toEqual("Unable to fetch post");
        }
    });

    it("returns response object on successful fetch", async () => {
        const mockResponse = { id: 1, content: "Hello" };
        fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });
        const response = await getAllComments("token");
        expect(response).toEqual(mockResponse);
    });
});
