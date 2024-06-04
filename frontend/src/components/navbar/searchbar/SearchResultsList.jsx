import "../searchbar/SearchResultList.css";
import { SearchResult } from "../searchbar/SearchResults";

export const SearchResultsList = ({ results }) => {
    return (
        <div className="results-list">
            {results.map((result, id) => {
                // const fullName = `${result.forename} ${result.surname}`;
                return (
                    <div key={id}>
                        <SearchResult FORENAME={result.forename} SURNAME={result.surname}/>
                    </div>
                );
            })}
        </div>
    );
};