import React, { useState } from "react";
import "./EditBioModal.css"
import { editBio } from "../../services/user";

export default function EditBioModal(  {username, toggleEditBioModal, triggerStateChange} ) {
    const [bioText, setBioText] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        editBio(bioText, username)
            .then((res) => {
                console.log(res)
                toggleEditBioModal()
                // handleBioUpdate(bioText)
                triggerStateChange()
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