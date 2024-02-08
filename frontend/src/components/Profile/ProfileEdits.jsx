import { useState } from "react";
import { setProfilePic } from "../../services/Profile";
import { useNavigate } from "react-router-dom";
import './ProfileEdits.css'
import Profile from "../../components/Profile/Profile";

const ProfileEdits = (props) => {
    const [state, setState] = useState({
        base64TextString: "",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate()


    const onChange = (e) => {

        if (!e.target.files) {
            return;
        }

        let file = e.target.files[0];

        console.log("file to upload:", file)
        if (file.size > 102400) {
            setSuccessMessage("This file is too large. Please chose a file under 102 kb")
        }

        if (file) {
            const reader = new FileReader();

            reader.onload = (readerEvt) => {
                let binaryString = readerEvt.target.result
                let b64String = btoa(binaryString)
                setState({
                    base64TextString: b64String
                })

                const preview = document.getElementById("profile-pic")
                preview.src = "data:image/png;base64," + b64String

            }

            reader.readAsBinaryString(file)
        }
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        if (state.base64TextString) {
            try {
                await setProfilePic(props.user.email, state.base64TextString, window.localStorage.getItem("token"));
                setSuccessMessage("Profile picture updated successfully!");
                // Redirect to profile page after a short delay
                setTimeout(() => navigate("/profile"), 2000);
            } catch (error) {
                console.error("Error updating profile picture:", error);
                // Handle error if needed
            }
        } else {
            console.log("No changes made.");
        }
    };

    return (
        <div className="App">
            {successMessage && <div className="success-message">{successMessage}</div>}
            <form onChange={(e) => onChange(e)} onSubmit={(e) => onSubmit(e)}>

                <input
                    type='file'
                    name="image"
                    id="file"
                    accept='.jpg, .png, .jpeg' 
                />
                <input type="submit"/>


            </form>
            <img alt="nada" id="profile-pic" className="preview-image" />

        </div>
    );
};

export default ProfileEdits;