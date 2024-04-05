import { useState, useEffect } from 'react';
import { getUserPosts } from "../../services/posts";
import { Post } from "../Post/Post"


export const ProfilePosts = () => {
    const [profilePosts, setProfilePosts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getUserPosts(token)
                .then((data) => {
                    setProfilePosts(data.posts);
                    localStorage.setItem("token", data.token);
                })
                .catch((error) => {
                    console.error('Error fetching profile data:', error); 
                });
        }
    }, []);

    return (
        <div className="container">
            <div className="feed pt-4" role="feed">
                <article> 
                {profilePosts.map((post) => (
                    <Post post={post} key={post._id} />
                ))}
                </article>
            </div>
        </div>
    );
};


// import { ToggleLike } from "./like";
// import profilePicture from "../../assets/profile-picture-square.jpg"
// export const Post = (props) => {
//   const date = new Date(props.post.createdDate);
//   const formattedDate = date.toLocaleString('en-UK', {
//     month: 'long',
//     day: 'numeric',
//     year: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//     hour12: true
//   });


//   return (
// <div className="container">
//     {/* encapsulate the post and give it a white background */}
//     <div className="div border border bg-white mb-3">
//       <div className="row">
//         <div className="col-1 d-none d-md-block">
//               <img
//                 className="rounded-circle py-1"
//                 src={profilePicture}
//                 alt="Your profile picture"
//                 aria-label="Your profile picture"
//                 style={{
//                   maxWidth: "50px", // Set maximum width to fill its container
//                   maxHeight: "50px", // Set maximum height
//                 }}
//               />
//         </div>
//         <div className="col-10">
//           <div className="row lightest-bg-color">
//             <div className="col-6">
//               <article aria-label="Post author" key={props.post._id} className="text-start">{props.post.user.username} </article>
//             </div>
//             <div className="col-6">
//               <article aria-label="Post header" key={props.post._id} className="text-end small-font align-items-e">{formattedDate}</article>
//             </div>
//         </div>
//         <div className="row bg-white">
//         <div className="col-12">
//           <article aria-label="Post text" key={props.post._id} className="text-start">{props.post.message}</article>
//         </div>
//       </div>
//       </div>
//         <div className="col-1" aria-label="Number of likes">
//           <ToggleLike isLiked={false} post={props.post}/>
//         </div>
//       </div>
//     </div>
//   </div>
//   );
// };