import { shuffle } from "../helpers/shuffle.js";
import { getTrack } from "../src/services/getTrack.js";

// Call getTrack function
getTrack().catch(error => {
  console.error("Error fetching track:", error);
});

export const randomTrack = async () => {
  try {
    const data = await getTrack();

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
