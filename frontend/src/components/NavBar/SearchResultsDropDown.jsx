import { Link } from "react-router-dom"
import './SearchResultsDropDown.jsx'

export default function SearchResultsDropDown( { foundUsers } ) {
    
    return (
        <div className="search-results">

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
