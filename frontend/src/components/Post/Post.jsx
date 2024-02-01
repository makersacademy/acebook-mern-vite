  
  
  const createDate = (date) => {  // Extract date parts
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

  // Format the date to dd/mm/yyyy hh:mm
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const Post = (props) => {


  const datetime = new Date(props.post.reg_time)
  const date = createDate(datetime)
  return <article key={props.post._id}>{props.post.message} <br></br>
    {props.post.userID} <br></br>
    {date}</article>;
};

export default Post;


