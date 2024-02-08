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
            <textarea className="bio-textarea" value={bioText} onChange={handleChange} />
            <div className="button-container">
                <button type="submit">
                    Submit
                </button>
            </div>
        </form>
    </div>
    )

}