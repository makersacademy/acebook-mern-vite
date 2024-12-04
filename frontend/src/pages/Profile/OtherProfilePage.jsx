import { NavBar } from "../../components/NavBar";
// import { OtherUserDetails } from "../../components/OtherUserDetails";
// import { PhotoUpload } from "../../components/PhotoUpload";
import { PhotoDisplay } from "../../components/PhotoDisplay";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserDetails } from "../../components/UserDetails";
import { getUserDetails } from "../../services/users";
import { PhotoUpload } from "../../components/PhotoUpload";



export function OtherProfile() {
//     const [photoLoad, setPhotoLoad] = useState(false);

//   function triggerPhotoLoad() {
//     setPhotoLoad(!photoLoad);
//   }
    const { username } = useParams();

    const [name, setName] = useState("");
    const [myProfile, setMyProfile] = useState(false);

    const [photoLoad, setPhotoLoad] = useState(false);
    const[photoFilePath, setPhotoFilePath] = useState("Test");


    function triggerPhotoLoad() {
      setPhotoLoad(!photoLoad);
    }


    useEffect(() => {
        const token = localStorage.getItem("token");
        getUserDetails(token, username)
        .then((data) => {
            // console.log(data.userData.photoFilePath)
            setName(`${data.userData.firstName} ${data.userData.lastName}`);
            setMyProfile(data.userData.myProfile);
            setPhotoFilePath(data.userData.photoFilePath);
            // console.log(photoFilePath);
            localStorage.setItem("token", data.token);
            })
            .catch((err) => {
                console.error(err);
            });
        }, [username, photoLoad]);


    return (
        <>
        <NavBar />
        {/* <body> */}
        <div className="Profile">
            <h1>Profile page</h1>
            <PhotoDisplay photoFilePath={photoFilePath}/>
            <UserDetails username={username} name={name} myProfile={myProfile}/>
            {myProfile ? <PhotoUpload triggerPhotoLoad={triggerPhotoLoad}/> : <p>No photo upload for you</p>}
            {/* <PhotoDisplay photoLoad={photoLoad}/> */}
            {/* <OtherUserDetails /> */}
        </div>
        {/* </body> */}
        </>
    );
}