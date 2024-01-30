const Profile = (props) => {
    return <article key={props.user._id}>{props.user.username}</article>;
};

export default Profile;