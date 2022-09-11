import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import FriendControls from "./FriendControls";
import Card from "../UI/Card";
import PageList from "../UI/PageList";
import style from "./FriendsList.module.css";

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

  const heading = "Friends";
  const noFriends = "You have not added any friends yet!";

  return (
    <PageList
      heading={heading}
      messageOnEmptyList={noFriends}
      listItems={friendsItems}
      isEmpty={friends.length < 1}
    />
  );
}

export default FriendsList;
