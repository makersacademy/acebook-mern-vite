import { vi } from "vitest";
import { answers } from "../../helpers/answer_generator.js";
// Mocking the randomArtists function
vi.mock("../../helpers/artist_generator", () => {
    const randomArtistsMock = vi.fn();
    randomArtistsMock.mockResolvedValue([
        { id: 1, name: "Artist 1" },
        { id: 2, name: "Artist 2" },
        { id: 3, name: "Artist 3" },
        { id: 4, name: "Artist 4" }
    ]);
    return {
        randomArtists: randomArtistsMock,
    };
});

vi.mock("../../helpers/shuffle", () => ({
    shuffle: vi.fn(array => array), // Mock shuffle to return the original array (no shuffling)
    }));

// Mocking the randomTrack function
vi.mock("../../helpers/track_generator", () => {
    const randomTrackMock = vi.fn();
    randomTrackMock.mockResolvedValue(
        { id: 45, title: "Title 45", artist: "Artist 45", album: { title: "Album 1"} }
        );
    return {
        randomTrack: randomTrackMock,
    };
});

vi.mock("../../helpers/album_generator", () => {
    const randomAlbumsMock = vi.fn();
    randomAlbumsMock.mockResolvedValue([
        { id: 1, title: "Album 1" },
        { id: 2, title: "Album 2" },
        { id: 3, title: "Album 3" },
        { id: 4, title: "Album 4" }
    ]);
    return {
        randomAlbums: randomAlbumsMock,
    };
});

describe("Answer Generator", () => {
    test('Returns first artist from tracks and other artists from artist list', async () => {
        console.log("Here")
        const answerss = await answers();
        console.log("YOYOYO")
        const expectedAnswers = {
            "selectedTrack": {id: 45, title: "Title 45", artist: "Artist 45", album: { title: "Album 1"} },
            "shuffledArtistAnswerList": ["Artist 45", "Artist 2", "Artist 3", "Artist 4"]
        };
        expect(answerss).toEqual(expectedAnswers);
    });
});
