import { useState } from "react"
import { searchUsers } from "../../services/user"

export default function SearchNavItem() {
    const [searchUserInput, setSearchUserInput] = useState("")
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const [foundUsers, setFoundUsers] = useState([])

    const handleInputChange = (event) => {
        setSearchUserInput(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("searching")
            searchUsers(searchUserInput)
                .then((data) => {
                    console.log(data)
                })
                .catch((err) => {
                    console.error(err);
                });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="input"
            placeholder="search user"
            value= {searchUserInput}
            onChange={handleInputChange}
            />
            <button type="submit">search</button>
        </form>
        
    )



}