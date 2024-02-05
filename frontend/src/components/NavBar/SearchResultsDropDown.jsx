import { Link } from "react-router-dom"
import './SearchResultsDropDown.jsx'
import { useEffect, useRef } from "react"

export default function SearchResultsDropDown( { foundUsers, setShowSearchResults } ) {
    const dropdownRef = useRef(null)

    useEffect(() => {
const handleClickOutside = (event) => {

    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSearchResults(false)
    }
}

document.addEventListener('mousedown', handleClickOutside)

return () => {
    document.removeEventListener('mousedown', handleClickOutside)
}
    }, [dropdownRef])
    
    return (
        <div ref={dropdownRef} className="search-results">

        {foundUsers.length === 0 ? 
            <h3>no users found </h3>
            :
            <>
            {foundUsers.map((user) => {
                return ( 
                <div className="found-user" key={user._id}>
                    <Link to={`/users/${user.username}`}>
                        {user.username}     
                    </Link>
                </div>
                )
            }
            )}
            </>

            }
        </div>

    )


}