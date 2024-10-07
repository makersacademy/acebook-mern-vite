
import {
  Container,
  PostContainer,
  PostHeader,
  UserContainer,
  UserDetails,
  UserName,
  TimeStamp,
  TextContent,
  Footer,
  Image
} from './Post.styled.js'; // Make sure to update this path

function Post(props) {
  const getDateString = (dateString) => {
    const date = new Date(dateString);
    let hour = date.getUTCHours();
    let meridium = "am";
    if (hour === 0) {
      hour = 12;
    }
    if (hour > 12) {
      meridium = "pm";
      hour -= 12;
    }
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(2);
    return `${hour}:${minutes}${meridium} - ${day}.${month}.${year}`;
  };

  const getRandomAvatar = () => {
    const avatarCount = 6; // Adjust to the number of SVGs in userAvatars
    const randomIndex = Math.floor(Math.random() * avatarCount) + 1;
    return `/src/assets/userAvatars/${randomIndex}.svg`;
  };

  return (
    <Container>
    <PostContainer key={props.id}>
      <PostHeader>
        <UserContainer>
          <Image src={getRandomAvatar()} alt="User Avatar" />
          <UserDetails>
            <UserName data-testid="username">{props.username}</UserName>
            <TimeStamp data-testid="dateCreated">
              {getDateString(props.dateCreated)}
            </TimeStamp>
          </UserDetails>
        </UserContainer>
      </PostHeader>
      <TextContent data-testid="message">{props.message}</TextContent>
      <Footer>
        <div data-testid="numberOfLikes">{props.noOfLikes} Likes</div>
      </Footer>
    </PostContainer>
    </Container>
  );
}

export default Post;
