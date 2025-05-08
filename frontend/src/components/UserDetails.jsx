// import { getUserDetails } from "../services/users"
// import { useState,useEffect } from "react";

export function UserDetails({ username, name, myProfile }) {
    // const[name, setName] = useState("");

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     getUserDetails(token, username)
    //     .then((data) => {
    //         // setName(`${data.userData.firstName} ${data.userData.lastName}`);
    //         setName("test");
    //         localStorage.setItem("token", data.token);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    //     }, []);


    return(
        <>
            <h2>{name}</h2>
            <p>@{username}</p>
            {/* {myProfile ? <p>Your profile?? {myProfile}</p> : <p>Not yours :-s</p>} */}
        </>
    )
}