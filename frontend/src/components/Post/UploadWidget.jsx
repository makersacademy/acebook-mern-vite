import { useEffect, useRef } from 'react';
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET

const UploadWidget = ( { folder, buttonText, handleImageUpload }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        console.log(cloudinaryRef);
        console.log(CLOUD_NAME)        
        console.log(UPLOAD_PRESET)
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: CLOUD_NAME,
            uploadPreset: UPLOAD_PRESET,
            folder: folder
        }, function(error, result) {
            if (result.event === "success") {
                console.log(result.info.public_id)
                handleImageUpload(result.info.public_id)
            }
            console.log(result)
        })
    }, [])
    const widgetClick = (event) => {
        event.preventDefault();
        widgetRef.current.open()
    }
    return (
        <button onClick={widgetClick}>
            {buttonText}
        </button>
    )
}

export default UploadWidget;