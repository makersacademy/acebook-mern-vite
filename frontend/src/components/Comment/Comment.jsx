import './Comment.css'

export default function Comment({key, _id, message, likes, postedBy, postedAt, user}) {
    
    const date = new Date(postedAt).toLocaleString('en-UK')
    
    return (

    
    <div className="comment-container" key={_id}>
        <div className="comment-user-image">
            <img src={user?.image} alt="Profile Picture" />
        </div>
        <div className="comment-body">
            <div className="comment-username">
                <h4>{user?.username}  </h4>
            </div>
            <div className="comment-message">
                <p>{message} </p>
            <div className="comment-date">
                <p>{date} </p>
            </div>
            <div className="comment-likes">
                <p>likes {likes} </p>
            </div>
        </div>
        </div>
            
    </div>
)

}