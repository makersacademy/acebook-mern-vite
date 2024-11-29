import { NavBar } from "../../components/NavBar";
import { MyUserDetails } from "../../components/MyUserDetails";
import { PhotoUpload } from "../../components/PhotoUpload";

export function Profile() {
  return (
    <>
    <NavBar />
    {/* <body> */}
    <div className="Profile">
      <h1>My profile page</h1>
      <PhotoUpload />
      <MyUserDetails />
    </div>
    {/* </body> */}
    </>
  );
}