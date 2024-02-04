import './Comment.css'

export default function Comment({key, _id, message, likes, postedBy, postedAt}) {
    
    const date = new Date(postedAt).toLocaleString('en-UK')
    
    return (
    
    <div className="comment-container" key={_id}>
        <p>comment message: {message} </p>
        <p>comment likes: {likes} </p>
        <p>posted by: {postedBy} </p>
        <p>posted at: {date} </p>
    </div>
)

}