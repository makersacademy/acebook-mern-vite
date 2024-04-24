import {shuffle} from "../helpers/shuffle.js"
import { getArtists } from "../src/services/getArtist.js";

// const BACKEND_URL = 'https://api.deezer.com/genre';

// export const getArtists = async () => {
//   const requestOptions = {
//     method: "GET"
//   };

// const genre_id = 132

//   const response = await fetch(`${BACKEND_URL}/${genre_id}/artists`, requestOptions);

//   if (response.status !== 200) {
//     throw new Error("Unable to fetch posts");
//   }

//   const data = await response.json();
//   return data.data;

// };

export const randomArtists = async () => {
  try{
    const data = await getArtists ();
      //create a list of dictionaries with artist ID and name
      const artistList = data.map(artist => ({
          name: artist.name,
          id: artist.id
        }));
        
  console.log(artistList)

  const shuffledArtists = shuffle(artistList); // Shuffle the array of artists
  const selectedArtists = shuffledArtists.slice(0, 4); // Select the first 4 artists
  return selectedArtists
}catch (error) {
  console.error("Error fetching artists:", error);
  throw new Error("Unable to fetch random artists");
}
};
