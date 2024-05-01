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

    const shuffledTracksList = shuffle(trackList); // Shuffle the array of IDs
    const shuffledTracks = shuffledTracksList.slice(0, 4); 
    const selectedTrack = shuffledTracks[0]; // Select the first track

    return { selectedTrack, shuffledTracks };
  } catch (error) {
    console.error("Error fetching tracks:", error);
    throw new Error("Unable to fetch random track");
  }
};
