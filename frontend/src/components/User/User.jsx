import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME

const User = (props) => {

  const cld = new Cloudinary({cloud: {cloudName: CLOUD_NAME}});
  const imageLocation = props.user.image;
  const myImage = cld.image(imageLocation);

  myImage.resize(fill().width(80).height(80)); 

  return (
    <div key={props.user._id}>
      <div data-testid="profileImage" className="profileImage"><AdvancedImage cldImg={myImage} style={{borderRadius: "50%", boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.1)"}}/></div>
      <div data-testid="profileFirstName" className="profileFirstName">{props.user.firstName}</div>
      <div data-testid="profileLastName" className="profileLastName">{props.user.lastName}</div>
      <div data-testid="profileBio" className="profileBio" >{props.user.bio}</div>
    </div>
  );
};

export default User;