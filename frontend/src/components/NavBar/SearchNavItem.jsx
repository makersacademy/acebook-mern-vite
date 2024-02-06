import { useState } from "react"
import { searchUsers } from "../../services/user"
import SearchResultsDropDown from "./SearchResultsDropDown"
import "./SearchNavItem.css"

export default function SearchNavItem( { handleSearch }) {
    const [searchUserInput, setSearchUserInput] = useState("")
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const [foundUsers, setFoundUsers] = useState([])

    const handleInputChange = (event) => {
        setSearchUserInput(event.target.value)
        event.preventDefault()
        searchUsers(event.target.value)
            .then((data) => {
                console.log("found this data", data.result)
                setFoundUsers(data.result)
                handleSearch(data.result)

            })
            .catch((err) => {
                console.error(err);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("Searching with this input", searchUserInput)
        searchUsers(searchUserInput)
            .then((data) => {
                console.log("found this data", data.result)
                setFoundUsers(data.result)
                handleSearch(data.result)

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
            <input id="search-box" type="input"
                placeholder="Search user"
                value= {searchUserInput}
                onChange={handleInputChange}
            />
            <button className="search-button" type="submit">
                <i className="fas fa-search"></i> 
            </button>
        </form>

        </>
    )



}