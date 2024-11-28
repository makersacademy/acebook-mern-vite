import { useEffect, useState } from "react";
import { getUsers } from "../services/users";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getUsers(token)
        .then((data) => {
          setUsers(data.users);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  console.log("filtered users:  ", filteredUsers);

  const createFilterUsers = (query, users) => {
    if (query.trim() === "") {
      return [];
    }
    return users.filter((el) => {
      return el.username.toLowerCase().includes(query.toLowerCase());
    });
  };

  useEffect(() => {
    const result = createFilterUsers(query, users);
    setFilteredUsers(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="search all coffee snobs"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {filteredUsers.map((el, index) => (
          <li key={index}>{el.username}</li>
        ))}
      </ul>
    </div>
  );
};
