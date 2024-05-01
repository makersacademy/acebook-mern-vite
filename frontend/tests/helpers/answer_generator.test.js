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
    randomTrackMock.mockResolvedValue({
        selectedTrack: { id: 45, title: "Title 45", artist: "Artist 45", album: { title: "Album 45"} },
        shuffledTracks: [
            { id: 45, title: "Title 45", artist: "Artist 45", album: { title: "Album 45"} },
            { id: 1, title: "Title 1", artist: "Artist 1", album: { title: "Album 1"} },
            { id: 2, title: "Title 2", artist: "Artist 2", album: { title: "Album 2"} },
            { id: 3, title: "Title 3", artist: "Artist 3", album: { title: "Album 3"} },
        ]
    }
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
    test('Returns the answer for each question', async () => {
        const result = await answers();
        let expectedAnswers;
        if (result.questionType === 0) {
            expectedAnswers = {
                "questionType": 0,
                "selectedTrack": {id: 45, title: "Title 45", artist: "Artist 45", album: { title: "Album 45"} },
                "shuffledArtistAnswerList": ["Title 45", "Title 1", "Title 2", "Title 3"]
            };
        } else if (result.questionType === 1) {
            expectedAnswers = {
                "questionType": 1,
                "selectedTrack": {id: 45, title: "Title 45", artist: "Artist 45", album: { title: "Album 45"} },
                "shuffledArtistAnswerList": ["Artist 45", "Artist 2", "Artist 3", "Artist 4"]
            };
        } else {
            expectedAnswers = {
                "questionType": 2,
                "selectedTrack": {id: 45, title: "Title 45", artist: "Artist 45", album: { title: "Album 45"} },
                "shuffledArtistAnswerList": [{ title: "Album 45"}, "Album 2", "Album 3", "Album 4"]
            };
        }
        expect(result).toEqual(expectedAnswers);
    });

    test('Returns the selected track and the shuffled list to be length 4', async () => {
        const result = await answers();
        expect(result).toHaveProperty('selectedTrack');
        expect(result.shuffledArtistAnswerList).toHaveLength(4);
    });
});


