const DeletePostButton = () => {

    const confirmDelete = () => {
        return confirm("Are you sure you want to delete?")
    }

    const handleDelete = () => {
        let result = confirmDelete()
        if (result) {
            console.log("Item Deleted")
        } else {
            console.log("Item Kept")
        }
        return
    }

    // When clicking delete:
    // Deletes from the database
    // Redirects back to the post page
    // Produces a message (are you sure)

    return <>
    <button onClick={handleDelete} className="deletePost">Delete</button>
    </>

  };
  
  export default DeletePostButton;
  