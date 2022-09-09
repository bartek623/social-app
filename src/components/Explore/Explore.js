import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import usePost from "../../hooks/usePost";
import LoadingBars from "../UI/LoadingBars";
import PostsList from "../Posts/PostsList";
import Container from "../UI/Container";
import style from "./Explore.module.css";

function Explore() {
  const { posts, tags } = useSelector((state) => state.posts);
  const { isLoading, getPosts } = usePost();
  const params = useParams();

  useEffect(() => {
    getPosts();
  }, [getPosts, params]);

  const tagsTransformed = tags.map((tag, i) => (
    <li key={"tag" + i} className={style.tag}>
      <Link to={`/explore/${tag}`}>{tag}</Link>
    </li>
  ));

  let postsFiltered = posts.filter((post) => !!post.tags);

  if (params.tag)
    postsFiltered = postsFiltered.filter((post) =>
      post.tags.includes(params.tag)
    );

  if (isLoading) {
    return <LoadingBars></LoadingBars>;
  }

  return (
    <Container>
      <header className={style.header}>
        <h1 className={style.heading}>Browse posts by tag</h1>
        {params.tag && <h3>Now seeing: {params.tag}</h3>}
        <ul className={style.tags}>{tagsTransformed}</ul>
      </header>
      <PostsList posts={postsFiltered}></PostsList>
    </Container>
  );
}

export default Explore;
