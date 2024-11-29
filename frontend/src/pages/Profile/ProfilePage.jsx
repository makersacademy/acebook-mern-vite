import { NavBar } from "../../components/NavBar";
import { PhotoUpload } from "../../components/PhotoUpload";

export function Profile() {
  return (
    <>
    <NavBar />
    {/* <body> */}
    <div className="Profile">
      <h1>My profile page</h1>
      <PhotoUpload />
    </div>
    {/* </body> */}
    </>
  );
}