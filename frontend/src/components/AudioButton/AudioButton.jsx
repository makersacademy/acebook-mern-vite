import { useState } from "react";
import "./AudioButton.css";

const AudioButton = ( {trackPreview} ) => {
    const [isPlaying, setIsPlaying] = useState(false);
    
    const handleClick = () => {
    setIsPlaying(!isPlaying);
    playPause()
  };

  function playPause() {
    var myAudio = document.getElementById("ASong");
    if (myAudio.paused) {
      myAudio.play();
    } else {
      myAudio.pause();
    }
  }


  return (
      <div className="audio">
      <button className={`play-button ${isPlaying ? 'pulsate' : ''}`} onClick={handleClick}>
        <span className="icon">{isPlaying ? "❚❚" : "▶"}</span> 
      </button>
        <audio id="ASong" src={trackPreview} loop hidden />
      </div>
  );
}


export default AudioButton





