import style from "./LikedPosts.module.css";
import PostsList from "../Posts/PostsList";
import Container from "../UI/Container";
import { useSelector } from "react-redux";

function LikedPosts(props) {
  const user = useSelector((state) => state.user);

  const likedPosts = props.posts.filter((post) =>
    post.likedBy.includes(user.username)
  );

  return (
    <Container>
      <h1 className={style.heading}>Liked posts</h1>
      {likedPosts.length > 0 && <PostsList posts={likedPosts} />}
      {likedPosts.length === 0 && (
        <p className={style["no-posts"]}>You have not liked any posts yet!</p>
      )}
    </Container>
  );
}

export default LikedPosts;
