import style from "./LikedPosts.module.css";
import PostsList from "../Posts/PostsList";
import Container from "../UI/Container";
import { useSelector } from "react-redux";
import useLoadPosts from "../../hooks/useLoadPosts";
import LoadingBars from "../UI/LoadingBars";

function LikedPosts() {
  const user = useSelector((state) => state.user);
  const { posts, isLoading } = useLoadPosts();

  const likedPosts = posts.filter((post) =>
    post.likedBy?.includes(user.username)
  );

  if (isLoading) return <LoadingBars />;

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
