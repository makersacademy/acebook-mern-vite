import { getMyPhoto } from "../services/photos"
import { useState, useEffect } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;




export function PhotoDisplay({ photoLoad }) {
    const[photoFilePath, setPhotoFilePath] = useState("");
    // const [photoSrc, setPhotoSrc] = useState("");

    useEffect(() => {
    const token = localStorage.getItem("token");
    getMyPhoto(token)
    .then((data) => {
        console.log(data);
        setPhotoFilePath(`${data.filePath}`);
        localStorage.setItem("token", data.token);
        })
        .catch((err) => {
            console.error(err);
        });
    }, [photoLoad]);

    return(
        <div>
            <p>{`${BACKEND_URL}/${photoFilePath}`}</p>
            <img src={`${BACKEND_URL}/${photoFilePath}`} width="300"></img>
        </div>

    )
}