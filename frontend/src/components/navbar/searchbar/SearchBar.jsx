import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("");
    
    
    const fetchData = (value) => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((json) => {
                const results = json.filter((user) => {
                return (
                    value &&
                    user &&
                    user.name.toLowerCase().includes(value)
                );
            });
            setResults(results);
        });
};
    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input 
                id="searchinput" type="text" placeholder="Search for new friends.." 
                value={input}  onChange={(e) => handleChange(e.target.value)}/>
        </div>
    )
}