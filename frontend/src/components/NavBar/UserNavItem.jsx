import './navbar.css'
export default function UserNavItem({ user }) {

    return (
        <div className="navbar-user-image">
            <img src={user.image}></img>
        </div>
    )
}