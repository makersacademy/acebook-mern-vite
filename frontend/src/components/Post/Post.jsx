import { format } from 'date-fns';
import "../../css/post.css"
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME

const Post = (props) => {

  const cld = new Cloudinary({cloud: {cloudName: CLOUD_NAME}});

  const imageLocation = props.post.image;
  const myImage = cld.image(imageLocation);
  myImage.resize(fill().width(250).height(250));  
  
    const howLongAgo = () => {
      const postDateTime = new Date(props.post.post_date);
      const formatedPostDateTime = format(postDateTime, "do MMMM yyyy, HH:mm");
      const now = new Date();
      const timeDifferenceSeconds = (now.getTime() - postDateTime.getTime())/1000;
      const timeDifferenceMins = Math.round(timeDifferenceSeconds /60);
      const timeDifferenceHours = Math.round(timeDifferenceMins /60);
      if (timeDifferenceSeconds < 60 ) {
        return "Less than a minute ago"
      } else if (timeDifferenceMins > 1 && timeDifferenceMins < 60) {
        return `${timeDifferenceMins} minutes ago`
      } else if (timeDifferenceMins === 1) {
        return `${timeDifferenceMins} minute ago`
      } else if (timeDifferenceHours > 1 && timeDifferenceHours < 24) {
        return `${timeDifferenceHours} hours ago`
      } else if (timeDifferenceHours === 1) {
        return `${timeDifferenceHours} hour ago`
      } else {
        return formatedPostDateTime;
      }
    }

  return <article className= "post" key={props.post._id}>
    <p data-testid = "message"> {props.post.message}</p>
    {props.post.image && <div><AdvancedImage cldImg={myImage} /></div>}
    <p data-testid = "time-ago">{howLongAgo()}</p>
  </article>;

};

export default Post;
