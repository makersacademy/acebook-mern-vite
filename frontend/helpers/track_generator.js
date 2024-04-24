import {shuffle} from "../helpers/shuffle.js"
import { randomArtists } from "./artist_generator.js";

const BACKEND_URL = 'https://api.deezer.com';

console.log("Artist list:", randomArtists)

const correctAnswerArtistID = randomArtists[0]["id"]; // Get the first randomly selected artist ID

console.log("Correct Artist ID:", correctAnswerArtistID)

export const getTrack = async () => {
  const requestOptions = {
    method: "GET"
  };

  const response = await fetch(`${BACKEND_URL}/artist/${correctAnswerArtistID}/top?limit=10`, requestOptions); // Use the correct artist ID in the URL

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
return data.data;
};

// Call getTrack function
getTrack().catch(error => {
  console.error("Error fetching track:", error);
});


export const randomTrack = await getTrack () 
    .then(data => {
    // const artistsDict = {}; // Initialize an empty dictionary
    const trackList = data.map(track => ({
        id: track.id,
        title: track.title,
        artist: track.artist.name,
        album: track.album.title
      }));
    console.log(trackList)
    const shuffledTrack = shuffle(trackList); // Shuffle the array of IDs
    const selectedTrack = shuffledTrack[0]; // Select the first 4 IDs
    return selectedTrack
    
});


