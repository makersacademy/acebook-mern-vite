import { useState } from "react";
import "./EditProfilePictureModal.css"
import { uploadImage } from "../../services/user";


export default function EditProfilePictureModal({image, username, toggleEditPictureModal, triggerStateChange}) {
    const [modal, setModal] = useState(false)
    const [file, setFile] = useState()

    const handleUpload = () => {
        // console.log("handling upload with file", file)
        const formData = new FormData();
        formData.append('file', file)
        uploadImage(formData, username)
            .then(res => res.json())
            .then(data => {
                console.log(data.image)
                // handleImageUpdate(data.image)
                toggleEditPictureModal()
                triggerStateChange()
            });
        }
    


    const toggleModal = () => {
        setModal(!modal)
    }


    return (
        <>
            <div className="profile-picture-modal">
            <div 
            onClick={toggleModal}
            className="">
            </div>
            <div className="">
                <h4>choose profile picture</h4>
                <input type="file" name="file" onChange={e => setFile(e.target.files[0])}/>
                <button onClick={handleUpload} >Upload</button>
            </div>
                
                {/* <button
                className=""
                onClick={toggleModal}>
                    Close
                </button> */}
            </div>


        </>
    )

    

}