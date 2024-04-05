import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import '../../css/User.css'
import {fill} from "@cloudinary/url-gen/actions/resize";
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME

const User = (props) => {

  const cld = new Cloudinary({cloud: {cloudName: CLOUD_NAME}});
  const imageLocation = props.user.image;
  const myImage = cld.image(imageLocation);
  const fullName = `${props.user.firstName}  ${props.user.lastName}`

  myImage.resize(fill().width(120).height(120)); 

  return (
    <div className="user-container mt-5" key={props.user._id}>
      {/* Apply glowing circle effect around the image */}      
      <div className="glowing-circle">
        <AdvancedImage  cldImg={myImage} style={{ borderRadius: "50%", paddingBottom: '20px' }} />
      </div>
      <div style={{ paddingBottom: '5px', paddingTop: '88px' }} data-testid="profileFirstName" className="profileFirstName">{props.user.firstName}'s Posts</div>
      <div style={{ paddingTop: '10px' }} data-testid="profileBio" className="profileBio">{props.user.bio}</div>
    </div>
  );
};

export default User;