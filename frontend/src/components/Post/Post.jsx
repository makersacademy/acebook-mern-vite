
import { ToggleLike } from "./like";
import profilePicture from "../../assets/profile-picture-square.jpg"

export const Post = (props) => {
  const date = new Date(props.post.createdDate);
  const formattedDate = date.toLocaleString('en-UK', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true 
  });
  return (
  <div className="container ">
    {/* encapsulate the post and give it a white background */}
    <div className="div border border bg-white mb-3 pt-2"> 
      <div className="row ">
        <div className="col-1 d-none d-md-block">
              <img
                className="rounded-circle ps-2"
                src={profilePicture}
                alt="Your profile picture"
                aria-label="Your profile picture"
                style={{
                  maxWidth: "50px", // Set maximum width to fill its container
                  maxHeight: "50px", // Set maximum height
                  height: "auto" // Ensure aspect ratio is maintained
                }}
              />
        </div>
        <div className="col-10 px-4">
          <div className="row lightest-bg-color">
            <article aria-label="Post Header" key={props.post._id}>{props.post.user} posted at {formattedDate}</article>
        </div>
        <div className="col-10 flex-column px-4 ">
          <article aria-label="Post text" key={props.post._id}>{props.post.message}</article>
        </div>
      </div>
              <div className="col-1" aria-label="Number of likes">
          <ToggleLike isLiked={false}/>
          <article key={props.post._id}>{props.post.likes}</article>
        </div>
        
      </div>
    </div>
  </div>
  );
};
