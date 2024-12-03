import { NavBar } from "../../components/NavBar";
import { MyUserDetails } from "../../components/MyUserDetails";
import { PhotoUpload } from "../../components/PhotoUpload";
import { PhotoDisplay } from "../../components/PhotoDisplay";
import { useState } from "react";

export function Profile() {
  const [photoLoad, setPhotoLoad] = useState(false);
  const [showDefaultImage, setShowDefaultImage] = useState(true);

  console.log("show default image", showDefaultImage);

  function triggerPhotoLoad() {
    setPhotoLoad(!photoLoad);
  }

  return (
    <>
      <NavBar />
      <body>
      <div className="Profile">
        <div className="container">
          <div className="column left">
          <PhotoDisplay
          photoLoad={photoLoad}
          showDefaultImage={showDefaultImage}
          />
          </div>
          <div className="column right">
          <h1><MyUserDetails /></h1> 
          </div>
        </div>
        <div className="container">
        <PhotoUpload
          triggerPhotoLoad={triggerPhotoLoad}
          setShowDefaultImage={setShowDefaultImage}
        />
        </div>
      </div>  
      </body>
    </>
  );
}
