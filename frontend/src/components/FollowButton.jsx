import { follow } from "../services/users";
import { unfollow } from "../services/users";

function FollowButton({ username, following, setFollowing }) {
        function handleFollow() {
            const token = localStorage.getItem("token");
            if (following) {
                unfollow(token, username)
                    .then((data) => {
                        setFollowing(data.following)
                        localStorage.setItem("token", data.token);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            } else {
                follow(token, username)
                    .then((data) => {
                        console.log(data)
                        console.log("Should be false", following)
                        setFollowing(data.following)
                        console.log("Should be true", following)
                        localStorage.setItem("token", data.token);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        }


// CHANGED ONCLICK TO NULL TO PREVENT ERROR

    return (
        <>
            <button onClick={handleFollow}>{following ? "Unfollow" : "Follow"}</button>

        </>

    )
}

export default FollowButton;