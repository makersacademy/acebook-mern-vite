import { format } from 'date-fns';

const Post = (props) => {


  
   
  
    const howLongAgo = () => {
      const postDateTime = new Date(props.post.post_date);
      const formatedPostDateTime = format(postDateTime, "do MMMM yyyy, HH:mm");
      const now = new Date();
      const timeDifferenceSeconds = (now.getTime() - postDateTime.getTime())/1000;
      const timeDifferenceMins = Math.round(timeDifferenceSeconds /60);
      const timeDifferenceHours = Math.round(timeDifferenceMins /60);
      if (timeDifferenceSeconds < 60 ) {
        return "Less than a minute ago"
      } else if (timeDifferenceMins < 60) {
        return `${timeDifferenceMins} minutes ago`
      } else if (timeDifferenceHours < 24) {
        return `${timeDifferenceHours} hours ago`
      } else {
        return formatedPostDateTime;
      }
    }

  return <article key={props.post._id}>
    <p data-testId = "message"> {props.post.message}</p>
    
    <p data-testId = "time-ago">{howLongAgo()}</p>
  </article>;

};

export default Post;
