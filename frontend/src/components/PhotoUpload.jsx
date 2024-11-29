import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function PhotoUpload() {
    const [photo, setPhoto] = useState()
    // const [allPhoto, setAllPhoto] = useState();

    useEffect(() => {
        getPhoto();
    }, []);

    const submitPhoto = async (e) => {
        e.preventDefault();

        const formData=new FormData();
        formData.append("photo", photo);

        const result = await axios.post("http://localhost:3000/upload-photo", 
            formData, 
            {
                headers: { "Content-Type" : "multipart/form-data"},
            }
        );
};

    const onInputChange = (e) => {
        console.log(e.target.files[0]);
        setPhoto(e.target.files[0]);
    };

    const getPhoto= async() => {
        const result = await axios.get("http://localhost:3000");
        console.log(result);
        // setAllPhoto(result.data.data);
        }

    return(
            <>
        <h2>Upload Image</h2>
        <form onSubmit={submitPhoto}>
        <label htmlFor="image">Profile Image:</label>
        <input
        id="image"
        type="file"
        accept="image/*"
                  // value={image ? image.name : ""}
        onChange={onInputChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
        </form>
        {/* {allPhoto.map(data => {
            return <img src={require(`../photos/${data.photo}`)}/>;
        })} */}
        </>
        );
        }
        
