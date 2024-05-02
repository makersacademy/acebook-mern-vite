import { useEffect, useState } from "react"
import { getUsersForLeaderboard } from "../../services/scoreService";

export const Leaderboard = ( {reloadLeaderboard} ) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsersForLeaderboard().then((users) => {
            users.sort((a, b) => {
                if (a.score === 0) return 1;
                if (b.score === 0) return -1;
                return b.score - a.score;
            });
            setUsers(users.slice(0, 10));
        });
    }, [reloadLeaderboard]);

    return (
        <div>
            <div className="font-bold p-5">Our top ten players</div>
            <table className="border w-1/3">
                <thead className="border">
                    <tr>
                        <th>Ranking</th>
                        <th></th>
                        <th>Player</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user, id) => (
                    <tr key={user._id}>
                        <td>{id + 1}</td>
                        <td><img src={user.imageUrl} className="rounded-full w-10" /></td>
                        <td>{user.name}</td>
                        <td>{user.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}