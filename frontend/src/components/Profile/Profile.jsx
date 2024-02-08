const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ace_of_spades.svg/1200px-Ace_of_spades.svg.png"

const Profile = (props) => {
    if (!props.user.profilePic){
        return(
            <article key={props.user._id}>
            <img
                src={defaultImage}
                alt={"image not set yet"}
                style={{ width: '120px', height: '140px' }} // Set your desired width and height
            /><br />
            Username: {props.user.username}<br />
            Email: {props.user.email}<br />
        </article>
        )
    } else {
    return (
        <article key={props.user._id}>
            <img
                src={"data:image/png;base64," + props.user.profilePic}
                alt={"image not set yet"}
                style={{ width: '120px' }} // Set your desired width and height
            /><br />
            Username: {props.user.username}<br />
            Email: {props.user.email}<br />
        </article>
    );
}};

export default Profile;