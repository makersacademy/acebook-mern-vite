import './Comment.css'
import timeFromNow from '../../utils/TimeFromNow'
import { Link } from 'react-router-dom'

export default function Comment({key, _id, message, likes, postedBy, postedAt, user}) {
    
    const date = timeFromNow(postedAt)
    
    return (

    
    <div className="comment-container" key={_id}>
        <Link to={`/users/${user?.username}`} className="comment-user-image">
        <div className="comment-user-image">
            <img src={user?.image} alt="Profile Picture" />
        </div>
        </Link>
        <div className="comment-body">
        <Link to={`/users/${user?.username}`} className="comment-user-image">
            <div className="comment-username">
                <h4>{user?.username}</h4>
            </div>
        </Link>
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