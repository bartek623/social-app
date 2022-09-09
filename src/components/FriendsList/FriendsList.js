import { useSelector } from "react-redux";

import FriendControls from "./FriendControls";
import Card from "../UI/Card";
import Container from "../UI/Container";
import style from "./FriendsList.module.css";
import { Link } from "react-router-dom";

function FriendsList() {
  const friends = useSelector((state) => state.user).friends || [];

  const friendsItems = friends.map((friend, i) => (
    <li key={"friend" + i}>
      <Card>
        <div className={style["friends-list__friend"]}>
          <Link to={`/profile/${friend.id}`}>{friend.username}</Link>
          <FriendControls userProfile={friend}></FriendControls>
        </div>
      </Card>
    </li>
  ));

  return (
    <Container>
      <h1 className={style.heading}>Your friends list</h1>
      {friends.length > 0 && (
        <ul className={style["friends-list"]}>{friendsItems}</ul>
      )}
      {friends.length === 0 && (
        <p className={style["no-friends"]}>
          You have not added any friends yet!
        </p>
      )}
    </Container>
  );
}

export default FriendsList;
