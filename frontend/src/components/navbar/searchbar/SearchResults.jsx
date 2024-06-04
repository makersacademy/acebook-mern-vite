import { useNavigate } from "react-router-dom";
import "./SearchResults.css";


export const SearchResult = ({ SURNAME, FORENAME }) => {
    const navigate = useNavigate ();

    const handleClick = () => {
        // alert(`You selected ${result}!`)
        navigate(`/profile/${FORENAME}`);

    };
    
    return (
        <div
            className="search-result"
            onClick={handleClick}
        >
        {FORENAME +' ' + SURNAME}
        </div>
    );
};
