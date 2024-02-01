import { useState } from "react"
import { getUser } from "../../services/user"

export default function SearchNavItem() {
    const [searchUserInput, setSearchUserInput] = useState("")
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const [foundUsers, setFoundUsers] = useState([])

    const handleInputChange = (event) => {
        setSearchUserInput(event.target.value)
    }

    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     console.log("searching")
    //         getUser(token, username)
    //             .then((data) => {
    //                 setUser(data.user);
    //                 console.log("user data", data.user)
    //                 setToken(data.token);
    //                 setProfilePicture(data.user.image)
    //                 setBio(data.user.bio)
    //                 window.localStorage.setItem("token", data.token);
    //             })
    //             .catch((err) => {
    //                 console.err(err);
    //             });
    // }

    return (
        <form onSubmit="">
            <input type="input"
            placeholder="search user"
            value= {searchUserInput}
            onChange={handleInputChange}
            />
            <button type="submit">search</button>
        </form>
        
    )



}