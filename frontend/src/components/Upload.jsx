import React, {useState} from "react";
import axios from 'axios';


const Upload = () => {

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("profilepicture", file);
        formData.append('bio', '');

    try {
    const res = await axios.post("http://localhost:3000/api/routes/profileUpload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(res.data.path);
} catch (error) {
    console.error('Error', error);
}
}
    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange}/>
            <button type="submit">Upload</button>
        </form>
    );
}

export default Upload;