import { NavBar } from "../../components/NavBar";
import { MyUserDetails } from "../../components/MyUserDetails";
import { PhotoUpload } from "../../components/PhotoUpload";
import { PhotoDisplay } from "../../components/PhotoDisplay";
import { useState } from "react";

export function Profile() {
  const [photoLoad, setPhotoLoad] = useState(false);

  function triggerPhotoLoad() {
    setPhotoLoad(!photoLoad);
  }

  return (
    <>
    <NavBar />
    {/* <body> */}
    <div className="Profile">
      <h1>My profile page</h1>
      <PhotoDisplay photoLoad={photoLoad}/>
      <PhotoUpload triggerPhotoLoad={triggerPhotoLoad}/>
      <MyUserDetails />
    </div>
    {/* </body> */}
    </>
  );
}