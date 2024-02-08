import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi, test, it, beforeEach } from "vitest";


import {
    getPosts,
    createNewPost,
    getSinglePost,
    deletePost,
    updatePost,
    likePost,
    getPostsByUser
} from "../../src/services/posts";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("posts service", () => {
    describe("getPosts", () => {
        test("includes a token with its request", async () => {
            fetch.mockResponseOnce(
                JSON.stringify({ posts: [], token: "newToken" }),
                {
                    status: 200,
                }
            );

            await getPosts("testToken");

            // This is an array of the arguments that were last passed to fetch
            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/posts`);
            expect(options.method).toEqual("GET");
            expect(options.headers["Authorization"]).toEqual(
                "Bearer testToken"
            );
        });

        it("rejects with an error if the status is not 200", async () => {
            fetch.mockResponseOnce(
                JSON.stringify({ message: "Something went wrong" }),
                { status: 400 }
            );

            try {
                await getPosts("testToken");
            } catch (err) {
                expect(err.message).toEqual("Unable to fetch posts");
            }
        });
    });
});

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

describe("createNewPost service", () => {
    beforeEach(() => {
        window.localStorage.clear();
        fetch.resetMocks();
    });

    it("No token is found", async () => {
        await expect(createNewPost("Hello")).rejects.toThrow(
            "No token found. User must be logged in."
        );
    });

    it("No message content", async () => {
        window.localStorage.setItem("token", "some-token");
        const response = await createNewPost("");
        expect(response).toEqual({
            status: 200,
            message: "posts must not be blank",
        });
    });

    it("returns response object on successful fetch", async () => {
        window.localStorage.setItem("token", "some-token");
        const mockResponse = { id: 1, content: "Hello" };

        fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 201 });

        const response = await createNewPost("Hello");
        expect(response).toEqual(mockResponse);
    });

    it("throws an error when fetch fails", async () => {
        window.localStorage.setItem("token", "some-token");

        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

        await expect(createNewPost("Hello")).rejects.toThrow(
            "Received status 500 when creating post. Expected 201"
        );
    });
});

describe("getPostsByUSer", () => {
    test("includes a token with its request", async () => {
        fetch.mockResponseOnce(
            JSON.stringify({ posts: [], token: "newToken" }),
            {
                status: 200,
            }
        );
        const username = "user123"
        await getPostsByUser(username, "testToken");

        // This is an array of the arguments that were last passed to fetch
        const fetchArguments = fetch.mock.lastCall;
        const url = fetchArguments[0];
        const options = fetchArguments[1];

        expect(url).toEqual(`${BACKEND_URL}/posts/find/username/${username}`);
        expect(options.method).toEqual("GET");
        expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    });

    it("rejects with an error if the status is not 200", async () => {
        fetch.mockResponseOnce(
            JSON.stringify({ message: "Something went wrong" }),
            { status: 400 }
        );

        try {
            const username = "user123"
            await getPostsByUser(username, "testToken");
        } catch (err) {
            expect(err.message).toEqual("Unable to fetch posts");
        }
    });

    it("returns response object on successful fetch", async () => {
        const mockResponse = { posts: [], token: "newToken" }
        fetch.mockResponseOnce(
            JSON.stringify(mockResponse),
            {
                status: 200,
            }
        );
        const username = "user123"
        const response = await getPostsByUser(username, "testToken");

        expect(response).toEqual(mockResponse);
    });
});

describe("getSinglePost", () => {
    test("includes a token with its request", async () => {
        const mockResponse = { id: 1, content: "Hello", token: "newToken" };
        fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

        await getSinglePost(1, "testToken");

        // This is an array of the arguments that were last passed to fetch
        const fetchArguments = fetch.mock.lastCall;
        const url = fetchArguments[0];
        const options = fetchArguments[1];

        expect(url).toEqual(`${BACKEND_URL}/posts/find/${mockResponse.id}`);
        expect(options.method).toEqual("GET");
        expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    });

    it("rejects with an error if the status is not 200", async () => {
        fetch.mockResponseOnce(
            JSON.stringify({ message: "Something went wrong" }),
            { status: 400 }
        );

        try {
            await getSinglePost("testToken");
        } catch (err) {
            expect(err.message).toEqual("Unable to fetch post");
        }
    });

    it("returns response object on successful fetch", async () => {
        const mockResponse = { id: 1, content: "Hello" };
        fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });
        const response = await getSinglePost("token");
        expect(response).toEqual(mockResponse);
    });
});

describe("tests delete post service", () => {
    it("includes a token with its request", async () => {
        const mockResponse = {
            message: "Post was deleted",
            token: "newToken",
        };
        fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });
        const mockPostID = 1;
        await deletePost(mockPostID, "testToken");

        // This is an array of the arguments that were last passed to fetch
        const fetchArguments = fetch.mock.lastCall;
        const url = fetchArguments[0];
        const options = fetchArguments[1];

        expect(url).toEqual(`${BACKEND_URL}/posts/find/${mockPostID}`);
        expect(options.method).toEqual("DELETE");
        expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    });

    it("rejects with an error if the status is not 200", async () => {
        const mockPostID = 1;
        fetch.mockResponseOnce(
            JSON.stringify({ message: "Something went wrong" }),
            { status: 400 }
        );

        try {
            await deletePost(mockPostID, "testToken");
        } catch (err) {
            expect(err.message).toEqual("Unable to delete post");
        }
    });

    it("returns response object on successful fetch", async () => {
        const mockPostID = 1;
        const mockResponse = { message: "Post was deleted", token: "newToken" };
        fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });
        const response = await deletePost(mockPostID, "token");
        expect(response).toEqual(mockResponse);
    });
});

describe("tests update post service", () => {
    it("includes a token with its request", async () => {
        const mockResponse = {
            message: "Post was updated",
            token: "newToken",
        };
        fetch.mockResponseOnce(JSON.stringify(mockResponse), {status: 200})
        const mockPostID = 1
        await updatePost(mockPostID, "Second Message", "testToken")

        // This is an array of the arguments that were last passed to fetch
        const fetchArguments = fetch.mock.lastCall;
        const url = fetchArguments[0];
        const options = fetchArguments[1];

        expect(url).toEqual(`${BACKEND_URL}/posts/find/${mockPostID}`);
        expect(options.method).toEqual("POST");
        expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    });

    it("rejects with an error if the status is not 200", async () => {
        const mockResponse = {
            message: "Post was updated",
            token: "newToken",
        };
        const mockPostID = 1;
        fetch.mockResponseOnce(JSON.stringify(mockResponse),{ status: 400 });

        try {
            await updatePost(mockPostID, "New message", "testToken");
        } catch (err) {
            expect(err.message).toEqual("Unable to update post")}  
    });

    it("returns response object on successful fetch", async () => {
        const mockPostID = 1;
        const mockResponse = {
            message: "Post was updated",
            token: "newToken",
        };
        fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });
        const response = await updatePost(mockPostID, "token");
        expect(response).toEqual(mockResponse);
    });
})