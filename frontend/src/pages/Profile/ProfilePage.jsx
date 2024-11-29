import { NavBar } from "../../components/NavBar";
import { MyUserDetails } from "../../components/MyUserDetails";
import { PhotoUpload } from "../../components/PhotoUpload";
import { PhotoDisplay } from "../../components/PhotoDisplay";

export function Profile() {
  return (
    <>
    <NavBar />
    {/* <body> */}
    <div className="Profile">
      <h1>My profile page</h1>
      <PhotoDisplay />
      <PhotoUpload />
      <MyUserDetails />
    </div>
    {/* </body> */}
    </>
  );
}