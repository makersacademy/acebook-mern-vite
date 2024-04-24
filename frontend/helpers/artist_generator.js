import {shuffle} from "../helpers/shuffle.js"
import { getArtists } from "../src/services/getArtist.js";

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
  console.log(selectedArtists)
  return selectedArtists
}catch (error) {
  console.error("Error fetching artists:", error);
  throw new Error("Unable to fetch random artists");
}
};

randomArtists();
