import { NavBar } from "../../components/NavBar";
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
    </div>
    {/* </body> */}
    </>
  );
}