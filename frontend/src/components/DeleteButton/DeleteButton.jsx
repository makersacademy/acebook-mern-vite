import ConfirmDeleteModal from './ConfirmDeleteModal';
// import './DeleteButton.css'
import { useState } from 'react';
import './ConfirmDeleteModal.css'

const DeleteButton = (props) => {
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    
    const deleteThePost = async (props) => {
        try {
            console.log(props);
            const response = await fetch(
                "http://localhost:3000/posts/:postId",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer " + window.localStorage.getItem("token"),
                    },
                    body: JSON.stringify({ postID: props.postID }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleDeletePostTrue = async () => {
        try {
            await deleteThePost(props);
            console.log("Post deleted");

            // Call the provided onDelete callback to trigger a re-render
            if (props.onDelete) {
                props.onDelete();
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleDeletePost = () => {
        setConfirmDeleteModal(true)
    }

    const handleDeletePostFalse = () => {
        setConfirmDeleteModal(false)
    }

    return props.showButton ? (
        <>
        <button onClick={handleDeletePost}>
            <i className="fa fa-trash" aria-hidden="true"></i>
        </button>

        { confirmDeleteModal && 

            <div className="confirm-delete-modal">

                <div 
                    onClick={()=> {setConfirmDeleteModal(false)}}
                    className="overlay">
                </div>

                <div className="modal-content">
    
                    <ConfirmDeleteModal 
                    handleDeletePostTrue={handleDeletePostTrue}
                    handleDeletePostFalse={handleDeletePostFalse}
                    />
                </div>

            </div>

        
        }
        </>
    ) : null;
};

export default DeleteButton;
