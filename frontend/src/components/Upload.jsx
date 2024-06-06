// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import axios from 'axios';
import { updateMyImage } from "../services/updateImage";

const Upload = () => {
    const [file, setFile] = useState(null);
    // const [image, setImage] = useState("");
    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("profilepicture", file);
        // formData.append('bio', '');
        console.log("file: ", file);
        
        try {
            const res = await axios.post("http://localhost:3000/api/routes/profileUpload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            const updatedProfile = await updateMyImage(token, res.data.path);
            console.log("res.data.path: ", res.data.path);
            setFile(updatedProfile.profilePictureURL);
            location.reload();
            console.log(res.data.path);
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange}/>
            <button type="submit">Upload</button>
            {/* <input id="upload" type="file" value={file} onChange={handleFileChange}/> */}
        </form>
    );
}

export default Upload;