import "./AudioButton.css";

const AudioButton = ({ trackPreview, onPlayPause, playButtonState }) => {
  console.log("Track Preview URL:", trackPreview);

  const handleClick = () => {
    onPlayPause();
    playPause();
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
      <button
        className={`play-button ${playButtonState ? "pulsate" : ""}`}
        onClick={handleClick}
      >
        <span className="icon">{playButtonState ? "❚❚" : "▶"}</span>
      </button>
      <audio id="ASong" src={trackPreview} loop hidden />
    </div>
  );
};

export default AudioButton;
