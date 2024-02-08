import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../services/profile";

const FilterByUser = (props) => {
    const [users, setUsers] = useState([])
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const navigate = useNavigate();
    

    useEffect(() => {
        if (token) {
            getUsers(token)
                .then((data) => {
                    setUsers(data.users);
                    console.log(users)
                    setToken(data.token)
                    window.localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.error(err);
                    navigate("/login");
                });
        } else {
            navigate("/login");
        }
    }, []);

    if (!token) {
        return;
    }

    const handleFilterChange = (event) => {
        props.setNewFilterValue(event.target.value)
    }

    return (
        <>
            <label>Filter by Username</label>
            <select name="users" id="users" onChange={handleFilterChange}>
                <option value="All">All</option>
                {users.map((user) => (
                    <option value={user.username} key={user.username}>{user.username}</option>
                ))}
            </select>
        </>
    )
}

export default FilterByUser