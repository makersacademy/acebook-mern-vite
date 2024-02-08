import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addFriend } from "../../services/profile";

const AllUsers = (props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const handleClick = () => {
        addFriend(props.user._id, token)
            .then((data) => {
                setToken(data.token)
                window.localStorage.setItem("token", data.token);
                console.log("Friend Added")
                navigate('/profile')
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <article key={props.user._id}>
            <p className="username"><img className="profilePic" src={"data:image/png;base64," + props.user.profilePic}/> {props.user.username}
            <button onClick={handleClick} className="addFriend">Add Friend</button></p>
        </article>
    )
}

export default AllUsers;