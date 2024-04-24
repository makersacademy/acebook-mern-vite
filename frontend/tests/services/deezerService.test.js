import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi } from "vitest";

import { getGenres } from "../../src/services/deezerService";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("deezer service", () => {
  describe("getGenres", () => {

    test("rejects with an error if the status is not 200", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );

      try {
        await getGenres();
      } catch (err) {
        expect(err.message).toEqual("Unable to fetch genres");
      }
    });

    test("returns genre names", async () => {
      fetch.mockResponseOnce(JSON.stringify([{name: "Pop"}, {name: "Rock"}]), {
        status: 200,
      });

      const genres = await getGenres();

      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];


      expect(url).toEqual(`${BACKEND_URL}/music/genre`);
      expect(options.method).toEqual("GET");
      expect(genres[0].name).toEqual("Pop");
      expect(genres[1].name).toEqual("Rock");
    });
  });
});
