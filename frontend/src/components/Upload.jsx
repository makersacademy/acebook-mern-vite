import React, {useState, useEffect} from "react";
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
        const token = localStorage.getItem('token');

        try {
            const res = await axios.post("http://localhost:3000/api/routes/profileUpload", formData, {
                headers: { "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
                },
            });
            console.log(res.data.path);
        } catch (error) {
            console.error('Error', error);
        }
    };

    return (
        <form id="form" onSubmit={handleSubmit} encType="multipart-form-data">
            <input id="file" type="file" onChange={handleFileChange}/>
            <button type="submit">Upload</button>
            <hr></hr>
        </form>
    );
};

export default Upload;
