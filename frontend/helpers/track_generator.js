import { shuffle } from "../helpers/shuffle.js";
import { getTopTracksForArtist } from "../src/services/deezerService.js";

export const randomTrack = async (artistID) => {
  try {
    const data = await getTopTracksForArtist(artistID);

    const trackList = data.map(track => ({
      id: track.id,
      title: track.title,
      artist: track.artist.name,
      album: track.album.title,
      preview: track.preview
    }));

    const shuffledTrack = shuffle(trackList); // Shuffle the array of IDs
    const selectedTrack = shuffledTrack[0]; // Select the first track
    return selectedTrack;
  } catch (error) {
    console.error("Error fetching tracks:", error);
    throw new Error("Unable to fetch random track");
  }
};
