import React, { useState } from "react";
import "./EditBioModal.css"
import { editBio } from "../../services/user";

export default function EditBioModal(  {username, toggleEditBioModal } ) {
    const [bioText, setBioText] = useState("")
    const [bioSubmitted, setBioSubmitted] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(bioText)
        editBio(bioText, username)
            .then((res) => {
                console.log(res)
                toggleEditBioModal()
                })
    
    }

    const handleChange = (event) => {
        setBioText(event.target.value)
    }

    return (

    <div className="edit-bio-modal">
        <form onSubmit={handleSubmit}>
            <input type="text" className="bio-text" value={bioText} onChange={handleChange} />
            <br></br>
            <button 
            type="submit">Submit</button>
        </form>
    </div>
    )

}