const Profile = (props) => {
    return <article key={props.user._id}>
        <div className="userdetails">Username: {props.user.username}<br></br>
        Email: {props.user.email}<br></br>
        <img src={"data:image/png;base64," + props.user.profilePic} alt="image not set yet"/>
        </div>
        {console.log("props")}
        {console.log(props)}
        </article>


};

export default Profile;