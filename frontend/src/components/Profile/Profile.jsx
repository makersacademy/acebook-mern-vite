const Profile = (props) => {
    return <article key={props.user._id}>
        Username: {props.user.username}<br></br>
        Email: {props.user.email}<br></br>
        <img src={"data:image/png;base64," + props.user.profilePic} alt="image not set yet"/>
        </article>;


};

export default Profile;