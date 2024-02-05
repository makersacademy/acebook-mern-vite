import { useState } from "react";
import { setProfile } from "../../services/Profile";

const ProfileEdits = (props) => {
    // return <article key={props.user._id}>
    //     Username: {props.user.username}<br></br>
    //     Email: {props.user.email}</article>;
    const [state, setState] = useState({
        base64TextString: "",
    });

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const onChange = (e) => {

        if (!e.target.files) {
            return;
        }

        let file = e.target.files[0];

        console.log("file to upload:", file)

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

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault()
        const updatedProfile = {};


        if (username) {
            updatedProfile.username = username;
        }

        if (email) {
            updatedProfile.email = email;
        }

        if (state.base64TextString) {
            updatedProfile.base64TextString = state.base64TextString;
        }

        // Check if there are any non-empty fields before making the change
        if (Object.keys(updatedProfile).length > 0) {
            setProfile(props.user._id, updatedProfile.username, updatedProfile.email, updatedProfile.base64TextString, window.localStorage.getItem("token"));
        } else {
            console.log("No changes made.");
        }
        setProfile(props.user.username, props.user.email, state.base64TextString, window.localStorage.getItem("token"))
    }

    return (
        <div className="App">

            <form onChange={(e) => onChange(e)} onSubmit={(e) => onSubmit(e)}>

                <input
                    type='file'
                    name="image"
                    id="file"
                    accept='.jpg, .png, .jpeg' 
                />
                <input
                    name="name"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <input
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                />

                <input type="submit"/>


            </form>
            <img alt="nada" id="profile-pic" />

        </div>
    );
};

export default ProfileEdits;