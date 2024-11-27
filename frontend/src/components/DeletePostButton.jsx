
const DeletePostId = ({post_id, DeletePostId, UpdatePost}) =>{
const token = localStorage.getItem("token");
    return (
      <button onClick={() => {
        DeletePostId(token, post_id)
        setTimeout(() => {UpdatePost(Math.random())}, 200)
        }}>Delete Post</button>
  )

};

export default DeletePostId;