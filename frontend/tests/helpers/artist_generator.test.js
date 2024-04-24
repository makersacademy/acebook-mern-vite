import { vi } from "vitest";
import { randomArtists } from "../..//helpers/artist_generator.js";
// Mocking the getArtists service
vi.mock("../../src/services/getArtist", () => {
    const getArtistsMock = vi.fn();
    getArtistsMock.mockResolvedValue([
    { id: 1, name: "Artist 1" },
    { id: 2, name: "Artist 2" },
    { id: 3, name: "Artist 3" },
    { id: 4, name: "Artist 4" },
    { id: 5, name: "Artist 5" }
    ]);
    return {
    getArtists: getArtistsMock,
    };
});
vi.mock("../../helpers/shuffle", () => ({
  shuffle: vi.fn(array => array), // Mock shuffle to return the original array (no shuffling)
}));
describe("Artist Generator", () => {
    test('Returns selected artists', async () => {
    const selectedArtists = await randomArtists();
    const expectedArtists = [
        { id: 1, name: "Artist 1" },
        { id: 2, name: "Artist 2" },
        { id: 3, name: "Artist 3" },
        { id: 4, name: "Artist 4" }
        ];
        expect(selectedArtists).toEqual(expectedArtists); //Confirm that array is sliced from 0 to 4
        console.log("Selected:", selectedArtists);
        console.log("Expected:", expectedArtists);
        expect(selectedArtists).toHaveLength(expectedArtists.length); //Confirm that length matches
        console.log("Selected.Lenght:", selectedArtists.length);
        console.log("expected.Lenght:", expectedArtists.length)

    });
});
