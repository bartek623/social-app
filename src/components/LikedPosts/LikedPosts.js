import { useEffect } from "react";
import { useSelector } from "react-redux";

import PostsList from "../Posts/PostsList";
import LoadingBars from "../UI/LoadingBars";
import usePost from "../../hooks/usePost";
import PageList from "../UI/PageList";

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

  const heading = "Liked posts";
  const noLikedPosts = "You have not liked any posts yet!";

  return (
    <PageList
      heading={heading}
      messageOnEmptyList={noLikedPosts}
      listItems={<PostsList posts={likedPosts} />}
      isEmpty={likedPosts.length < 1}
    />
  );
}

export default LikedPosts;
