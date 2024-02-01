import { useState } from "react"
import { searchUsers } from "../../services/user"
import SearchResultsDropDown from "./SearchResultsDropDown"

export default function SearchNavItem( { handleSearch }) {
    const [searchUserInput, setSearchUserInput] = useState("")
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const [foundUsers, setFoundUsers] = useState([])
    const [showResults, setShowResults] = useState(false)

    const handleInputChange = (event) => {
        setSearchUserInput(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("searching")
            searchUsers(searchUserInput)
                .then((data) => {
                    setFoundUsers(data.result)
                    // setShowResults(true)
                    handleSearch(foundUsers)

                })
                .catch((err) => {
                    console.error(err);
                });
    }

    if(!token) 
        return;

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="input"
            placeholder="search user"
            value= {searchUserInput}
            onChange={handleInputChange}
            />
            <button type="submit">search</button>
        </form>

        </>
    )



}