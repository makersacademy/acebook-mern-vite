import { randomArtists } from "./artist_generator.js";
import { randomTrack} from "./track_generator.js";
import {shuffle} from "../helpers/shuffle.js"
export const artistAnswers = async () => {
    const artistAnswerList = [];
    // Push the artist name from the selected track to the answer list. We take from here rather than artist selection
    // because in some cases the artist is featured so this doesn't exactly match the track artist name
    const selectedTrack = await randomTrack ();
    artistAnswerList.push(selectedTrack["artist"]);
  // Iterate over all artist expect the first and push their names to the answer list
  const answerArtists = await randomArtists ();
  for (let i = 1; i < answerArtists.length; i++) {
    artistAnswerList.push(answerArtists[i].name);
  }
  //shuffle the answers to randomise the position of the right answer
  const shuffledArtistAnswerList = shuffle(artistAnswerList)


  return {selectedTrack, shuffledArtistAnswerList}

    };

artistAnswers().then((output) => 
(console.log(output)));