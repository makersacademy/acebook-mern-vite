
const DeletePostId = ({post_id, DeletePostId, UpdatePost}) =>{
const token = localStorage.getItem("token");
    return (
      <button onClick={() => {
        DeletePostId(token, post_id)
        UpdatePost(post_id)
        }}>Delete Post</button>
  )

};

export default DeletePostId;