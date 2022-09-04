import Post from "./Post";
import style from "./PostsList.module.css";

function PostsList(props) {
  const postsTransformed = props.posts.map((post, i) => (
    <Post key={"p" + i} post={post} />
  ));

  return <ul className={style["posts-list"]}>{postsTransformed}</ul>;
}

export default PostsList;
