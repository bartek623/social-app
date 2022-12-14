import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useUser from "../../hooks/useUser";
import LoadingBars from "../UI/LoadingBars";
import PostsList from "../Posts/PostsList";
import style from "./Profile.module.css";
import Container from "../UI/Container";
import Card from "../UI/Card";
import { useSelector } from "react-redux";
import usePost from "../../hooks/usePost";
import FriendControls from "../FriendsList/FriendControls";

function Profile() {
  const posts = useSelector((state) => state.posts).posts;
  const { getPosts, isLoading: postLoading } = usePost();
  const { error, isLoading, findUser } = useUser();
  const { userId } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    findUser(userId, setUser);
    getPosts();
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
        <FriendControls userProfile={user} />
      </Card>
      {postLoading && <LoadingBars />}
      {!postLoading && <PostsList posts={postsFiltered} />}
    </Container>
  );
}

export default Profile;
