import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useUser from "../../hooks/useUser";
import LoadingBars from "../UI/LoadingBars";
import PostsList from "../Posts/PostsList";
import style from "./Profile.module.css";
import usePost from "../../hooks/usePost";
import Container from "../UI/Container";
import Card from "../UI/Card";

function Profile() {
  const { error, isLoading, findUser } = useUser();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const { getPosts, isLoading: postLoading } = usePost();

  useEffect(() => {
    findUser(userId, setUser);

    getPosts(setPosts);
  }, [findUser, userId, getPosts]);

  if (error) return <p className={style.error}>{error}</p>;

  if (isLoading || !user?.username) return <LoadingBars />;

  const postsFiltered = posts.filter((post) => post.author === user.username);

  return (
    <Container>
      <Card>
        <div className={style["profile-background"]}>
          <div className={style.avatar}></div>
        </div>
        <span className={style.username}>{user.username}</span>
      </Card>
      {postLoading && <LoadingBars />}
      {!postLoading && <PostsList posts={postsFiltered} />}
    </Container>
  );
}

export default Profile;
