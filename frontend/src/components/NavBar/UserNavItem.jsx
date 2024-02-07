import './navbar.css'
import { Link } from 'react-router-dom'

export default function UserNavItem({ user }) {

    return (
        <div className="navbar-user-image">
            <Link to={`/users/${user.username}`}>
                <img src={user.image}></img>
            </Link>   
        </div>
    )
}