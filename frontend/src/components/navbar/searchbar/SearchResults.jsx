// fetch("0.0.0.0/acebook")x
import "./SearchResults.css";


export const SearchResult = ({ result }) => {
    const handleClick = () => {
        alert(`You selected ${result}!`)
    };
    
    return (
        <div
            className="search-result"
            onClick={handleClick}
        >
        {result}
        </div>
    );
};
