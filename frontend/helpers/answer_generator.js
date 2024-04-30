import { randomArtists } from "./artist_generator.js";
import { randomTrack } from "./track_generator.js";
import { randomAlbums } from "./album_generator.js"
import { shuffle } from "../helpers/shuffle.js"


export const answers = async (genreID) => {
  let fourAlbums = false;
  let correctAnswerArtistID;
  let answerAlbums;
  while (!fourAlbums) {
    const selectedArtists = await randomArtists(genreID)
    correctAnswerArtistID = selectedArtists[0]["id"];
    answerAlbums = await randomAlbums(correctAnswerArtistID);
    if (answerAlbums.length >= 4) {
      fourAlbums = true;
    }
  }
  const answerList = [];
  // Randomly decide whether to use track titles or artist names or album title
  // Generates a random number between 0 and 2
  const questionType = Math.floor(Math.random() * 3);

  const { selectedTrack, shuffledTracks } = await randomTrack(correctAnswerArtistID);
  if (questionType === 0) {
    console.log("it is me")
    answerList.push(selectedTrack.title);
    for (let i = 1; i < shuffledTracks.length; i++) {
      answerList.push(shuffledTracks[i].title);
    }
  } else if (questionType === 1) {
    const answerArtists = await randomArtists(genreID);
    answerList.push(selectedTrack.artist);
    // Iterate over all artist expect the first and push their names to the answer list
    for (let i = 1; i < answerArtists.length; i++) {
      answerList.push(answerArtists[i].name);
    }
  } else {
    answerList.push(selectedTrack.album);
    for (let i = 1; i < answerAlbums.length; i++) {
      answerList.push(answerAlbums[i].title);
    }
  }
  // Shuffle the answers to randomize the position of the right answer
  const shuffledArtistAnswerList = shuffle(answerList);

  return { selectedTrack, shuffledArtistAnswerList, questionType };

};


  
  // import { randomArtists } from "./artist_generator.js";
  // import { randomTrack } from "./track_generator.js";
  // import { shuffle } from "../helpers/shuffle.js"
  
  // export const artistAnswers = async (genreID) => {
  //   const selectedArtists = await randomArtists(genreID)
  //   const correctAnswerArtistID = selectedArtists[0]["id"];
  //   const artistAnswerList = [];
  //   // Push the artist name from the selected track to the answer list. We take from here rather than artist selection
  //   // because in some cases the artist is featured so this doesn't exactly match the track artist name
  //   const selectedTrack = await randomTrack(correctAnswerArtistID);
  //   artistAnswerList.push(selectedTrack["artist"]);
  //   // Iterate over all artist expect the first and push their names to the answer list
  //   const answerArtists = await randomArtists(genreID);
  //   for (let i = 1; i < answerArtists.length; i++) {
  //     artistAnswerList.push(answerArtists[i].name);
  //   }
  //   //shuffle the answers to randomise the position of the right answer
  //   const shuffledArtistAnswerList = shuffle(artistAnswerList)
  
  //   return { selectedTrack, shuffledArtistAnswerList }
  
  // };
  
  // import { randomArtists } from "./artist_generator.js";
  // import { randomTrack } from "./track_generator.js";
  // import { shuffle } from "../helpers/shuffle.js";
  
  // export const artistAnswers = async (genreID) => {
  //   const selectedArtists = await randomArtists(genreID);
  //   const correctAnswerArtistID = selectedArtists[0]["id"];
  //   const artistAnswerList = [];
  
  //   // Fetch the selected track for the correct answer artist
  //   const selectedTrack = await randomTrack(correctAnswerArtistID);
  //   artistAnswerList.push(selectedTrack.title);
  
  //   // Iterate over all artists except the first and push their track titles to the answer list
  //   for (let i = 1; i < selectedArtists.length; i++) {
  //     const track = await randomTrack(selectedArtists[i].id);
  //     artistAnswerList.push(track.title);
  //   }
  
  //   // Shuffle the answers to randomize the position of the right answer
  //   const shuffledArtistAnswerList = shuffle(artistAnswerList);
  
  //   return { selectedTrack, shuffledArtistAnswerList };
  // };
  
  




