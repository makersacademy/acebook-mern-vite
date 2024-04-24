import { randomArtists } from "./artist_generator.js";
import { randomTrack} from "./track_generator.js";
import {shuffle} from "../helpers/shuffle.js"


export const artistAnswers = () => {
    const artistAnswerList = [];
    console.log ("Selected Track:", randomTrack)
    // Push the artist name from the selected track to the answer list. We take from here rather than artist selection 
    // because in some cases the artist is featured so this doesn't exactly match the track artist name
    artistAnswerList.push(randomTrack["artist"]);

  // Iterate over all artist expect the first and push their names to the answer list
  for (let i = 1; i < randomArtists.length; i++) {
    artistAnswerList.push(randomArtists[i].name);
  }
  console.log("Artist answer list:", artistAnswerList);

  //shuffle the answers to randomise the position of the right answer
  const shuffledArtistAnswerList = shuffle(artistAnswerList)
  
      
      console.log("Shuffled artist answer list:", shuffledArtistAnswerList)

    };

artistAnswers();


