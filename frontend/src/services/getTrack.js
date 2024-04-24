import { randomArtists } from "../../helpers/artist_generator.js";

const BACKEND_URL = 'https://api.deezer.com';

//console.log("Artist list:", randomArtists)

const selectedArtists = await randomArtists()
const correctAnswerArtistID = selectedArtists[0]["id"]; // Get the first randomly selected artist ID


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

getTrack();