import { format } from 'date-fns';

const Post = (props) => {


    const postDateTime = Date(props.post.post_date);
   
  
    const howLongAgo = () => {
      const postDateTime = new Date(props.post.post_date);
      const now = new Date();
      const timeDifferenceSeconds = (now.getTime() - postDateTime.getTime())/1000;
      const timeDifferenceMins = Math.round(timeDifferenceSeconds /60);
      const timeDifferenceHours = Math.round(timeDifferenceMins /60);
      if (timeDifferenceMins < 1 ) {
        return "Less than a minute ago"
      } else if (timeDifferenceMins < 60) {
        return `${timeDifferenceMins} minutes ago`
      } else if (timeDifferenceHours < 24) {
        return `${timeDifferenceHours} hours ago`
      } else {
        return format(postDateTime, "do MMMM yyyy, HH:mm")
      }
    }

  return <article key={props.post._id}>{props.post.message}
    
    <p>{howLongAgo()}</p>
  </article>;

};

export default Post;
