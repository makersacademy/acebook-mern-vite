import { getMyUserDetails } from "../services/users"
import { useState,useEffect } from "react";
export function MyUserDetails() {
    const[name, setName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        getMyUserDetails(token)
        .then((data) => {
            setName(`${data.userData.firstName} ${data.userData.lastName}`);
            localStorage.setItem("token", data.token);
            })
            .catch((err) => {
                console.error(err);
            });
        }, []);


    return(
        <>
            <p>{name}</p>
        </>
    )
}