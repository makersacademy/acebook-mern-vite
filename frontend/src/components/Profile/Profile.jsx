const Profile = (props) => {
    return <article key={props.user._id}>
        Username: {props.user.username}<br></br>
        Email: {props.user.email}</article>;

};

export default Profile;