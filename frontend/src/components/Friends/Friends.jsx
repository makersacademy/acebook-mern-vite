import { Link } from "react-router-dom"
import './Friends.css'

export default function Friends({ friends }) {

    return (
        <>
        {friends.map((friend) => 
            friend ? 
            <Link key={friend._id} to={`/users/${friend.username}`} className="friend-container">
                <div className="friend-image-container">
                    <img className="friend-image"src={friend.image}></img>
                </div>

                <div className="friend-username">
                    {friend.username}     
                </div>
            </Link>
            
            : null
        )}
    </>
    
    )
}