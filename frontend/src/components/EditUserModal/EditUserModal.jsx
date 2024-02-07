import React from "react";
import { useState } from "react";
import "./EditUserModal.css"
import EditProfilePictureModal from "../EditProfilePictureModal/EditProfilePictureModal";
import EditBioModal from "../EditBioModal/EditBioModal";
import User from "../User/User";

export default function EditUserModal( {username, image, handleImageUpdate, handleBioUpdate, triggerStateChange}) { 
    const [modal, setModal] = useState(false)
    const [editPictureModal, setEditPictureModal] = useState(false)
    const [editBioModal, setEditBioModal] = useState(false)
    
    const toggleModal = () => {
        setModal(!modal)
    }

    const toggleEditPictureModal = () => {
        setEditPictureModal(!editPictureModal)
    }

    const toggleEditBioModal = () => {
        setEditBioModal(!editBioModal)

    }

    return (
        <>
        <button 
        onClick={toggleModal}
        className="btn-modal">
            Edit Profile
        </button>

        {modal && (

            <div className="modal">
            
            <div 
            onClick={toggleModal}
            className="overlay">
            </div>
            
            <div className="modal-content">
                <h2>Edit Profile</h2>
                
                <div className="profile-picture">
                    <h3>Profile Picture</h3>
                    <img src={image} alt="Profile Picture" />
                    <br></br>
                    <button
                        onClick={toggleEditPictureModal}
                    >edit</button><br></br>
                    {editPictureModal && 
                        <div>
                        <EditProfilePictureModal 
                            username={username}
                            toggleEditPictureModal={toggleEditPictureModal}
                            handleImageUpdate={handleImageUpdate}
                            triggerStateChange={triggerStateChange}
                        /> 
                        <button
                        onClick={toggleEditPictureModal}
                        >close</button>
                        </div>
                    }
                    
                </div>
                
                <div className="profile-picture">
                    <h3>bio</h3>
                    <button
                        onClick={toggleEditBioModal}
                    >
                        edit</button>
                    {editBioModal && 
                        <div>
                        <EditBioModal 
                            username={username}
                            toggleEditBioModal={toggleEditBioModal}
                            handleBioUpdate={handleBioUpdate}
                            triggerStateChange={triggerStateChange}
                        />
                        <button
                            onClick={toggleEditBioModal}
                            >close</button>
                        </div>
                    }

                </div>
                <button
                className="close-modal"
                onClick={toggleModal}>
                    Close
                </button>
            </div>
            </div>

        )}

        </>

    )
}

