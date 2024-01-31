import createFetchMock from "vitest-fetch-mock";
import { describe, vi, test, expect} from "vitest";

import { login, signup } from "../../src/services/authentication";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("authentication service", () => {
  describe("login", () => {
    test("calls the backend url for a token", async () => {
      const testEmail = "test@testEmail.com";
      const testPassword = "12345678";

      fetch.mockResponseOnce(JSON.stringify({ token: "testToken" }), {
        status: 201,
      });

      await login(testEmail, testPassword);

      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/tokens`);
      expect(options.method).toEqual("POST");
      expect(options.body).toEqual(
        JSON.stringify({ email: testEmail, password: testPassword })
      );
      expect(options.headers["Content-Type"]).toEqual("application/json");
    });

    test("returns the token if the request was a success", async () => {
      const testEmail = "test@testEmail.com";
      const testPassword = "12345678";

      fetch.mockResponseOnce(JSON.stringify({ token: "testToken" }), {
        status: 201,
      });

      const token = await login(testEmail, testPassword);
      expect(token).toEqual("testToken");
    });

    test("throws an error if the request failed", async () => {
      const testEmail = "test@testEmail.com";
      const testPassword = "12345678";

      fetch.mockResponseOnce(JSON.stringify({ message: "Wrong Password" }), {
        status: 403,
      });

      try {
        await login(testEmail, testPassword);
      } catch (err) {
        expect(err.message).toEqual(
          "Wrong Password"
        );
      }
    });
  });

  describe("signup", () => {
    test("calls the backend url for a token", async () => {
      const testUsername = "testUser"
      const testEmail = "test@testEmail.com";
      const testPassword = "12345678";

      fetch.mockResponseOnce("", {
        status: 201,
      });

      await signup(testUsername, testEmail, testPassword);

      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/users`);
      expect(options.method).toEqual("POST");
      expect(options.body).toEqual(
        JSON.stringify({ username: testUsername, email: testEmail, password: testPassword })
      );
      expect(options.headers["Content-Type"]).toEqual("application/json");
    });

    test("returns nothing if the signup request was a success", async () => {
      const testUsername = "testUser"
      const testEmail = "test@testEmail.com";
      const testPassword = "12345678";

      fetch.mockResponseOnce(JSON.stringify(""), {
        status: 201,
      });

      const token = await signup(testUsername, testEmail, testPassword);
      expect(token).toEqual(undefined);
    });

    test("throws an error if the request failed", async () => {
      const testUsername = "testUser"
      const testEmail = "test@testEmail.com";
      const testPassword = "12345678";

      fetch.mockResponseOnce(
        JSON.stringify({ message: "Error signing up" }),
        {
          status: 400,
        }
      );

      try {
        await signup(testUsername, testEmail, testPassword);
      } catch (err) {
        expect(err.message).toEqual(
          "Error signing up"
        );
      }
    });
    test("throws an error if username or email already exists", async () => {
      const testUsername = "testUser"
      const testEmail = "test@testEmail.com";
      const testPassword = "12345678";

      fetch.mockResponseOnce(
        JSON.stringify({ message: "Username already exists" }),
        {
          status: 409,
        }
      );

      try {
        await signup(testUsername, testEmail, testPassword);
      } catch (err) {
        expect(err.message).toEqual(
          `Username already exists`
        );
      }
    });
  });
});
