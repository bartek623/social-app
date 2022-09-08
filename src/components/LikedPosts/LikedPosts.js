import style from "./LikedPosts.module.css";
import PostsList from "../Posts/PostsList";
import Container from "../UI/Container";
import { useSelector } from "react-redux";
import LoadingBars from "../UI/LoadingBars";
import usePost from "../../hooks/usePost";
import { useEffect } from "react";

function LikedPosts() {
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts).posts;
  const { isLoading, getPosts } = usePost();

  useEffect(() => {
    getPosts();
  }, [getPosts]);

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
