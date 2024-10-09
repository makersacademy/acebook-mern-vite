import { NavbarComponent } from "../../components/NavbarComponent";
import { UpdateEmail } from "../../components/UpdateEmail";
import { UpdateUsername } from "../../components/UpdateUsername";
import { UploadProfilePic } from "../../components/uploadProfilePicture";

export function UpdateUser() {
    return (
        <>
        <NavbarComponent/>
        <UploadProfilePic/>
        <UpdateUsername/>
        <UpdateEmail/>
        </>
    )
}