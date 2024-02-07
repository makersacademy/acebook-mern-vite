import './ConfirmDeleteModal.css'

export default function ConfirmDeleteModal({ handleDeletePostTrue, handleDeletePostFalse }) {

    
    return (

        <div className="confirm-delete-container">

            <div className="text-content">
                <p> confirm delete post?</p>
            </div>

            <div className="buttons">
                <div className="button">
                    <button
                        type="button"
                        onClick={handleDeletePostTrue}
                    >
                        Yes
                    </button>
                </div>

                <div className="button">
                    <button
                        type="button"
                        onClick={handleDeletePostFalse}
                    >
                        No
                    </button>
                </div>
            </div>

        </div>
        
    )
}