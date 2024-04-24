import { vi } from "vitest";
import { randomTrack } from "../../helpers/track_generator.js";
// Mocking the getArtists service
vi.mock("../../src/services/getTrack", () => {
    const getTrackMock = vi.fn();
    getTrackMock.mockResolvedValue([
        { id: 45, title: "Title 45", artist: {name: "Artist 1"}, album: {title:"Album 1"} },
        { id: 2, title: "Title 2", artist: "Artist 2", album: "Album 2" },
        { id: 3, title: "Title 3", artist: "Artist 3", album: "Album 3" },
        { id: 4, title: "Title 4", artist: "Artist 4", album: "Album 4" },
        { id: 5, title: "Title 5", artist: "Artist 5", album: "Album 5" },
        { id: 6, title: "Title 6", artist: "Artist 6", album: "Album 6" },
    ]);
return {
    getTrack: getTrackMock,
    };
});
vi.mock("../../helpers/shuffle", () => ({
  shuffle: vi.fn(array => array), // Mock shuffle to return the original array (no shuffling)
}));
describe("Track Generator", () => {
    beforeEach(() => {
    });
    test('Returns first track from shuffled list', async () => {
        const selectedTrack = await randomTrack();
        const expectedTrack =
            { id: 45, title: "Title 45", artist: "Artist 1", album: "Album 1" };
        expect(selectedTrack).toEqual(expectedTrack);
    });
});
