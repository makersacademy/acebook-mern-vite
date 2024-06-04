import { useNavigate } from "react-router-dom";
import "./SearchResults.css";

import { useState, useEffect } from "react";

export const SearchResult = ({ SURNAME, FORENAME, userid, handleUserIdChange }) => {
    const navigate = useNavigate ();

    
    const handleClick = () => {
        navigate(`/profile/${userid}`);
        window.location.reload();
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

