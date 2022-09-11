import { useSelector } from "react-redux";

import useUser from "../../hooks/useUser";
import LoadingSpinner from "../UI/LoadingSpinner";
import style from "./FriendControls.module.css";

function FriendControls(props) {
  const { modifyFriends, isLoading, pushNotification } = useUser();
  const user = useSelector((state) => state.user);
  const userInfo = {
    username: props.userProfile.username,
    id: props.userProfile.id,
  };

  const isInFriendsList = !!user.friends?.some(
    (friend) => friend.id === userInfo.id
  );

  const setFriendsHandler = function () {
    let friendsUpdated;
    const currFriends = user.friends || [];

    if (isInFriendsList) {
      friendsUpdated = currFriends.filter(
        (friend) => friend.id !== userInfo.id
      );
    }
    if (!isInFriendsList) {
      friendsUpdated = [userInfo, ...currFriends];

      const notification = `${user.username} added you as friend!`;
      pushNotification(notification, userInfo.id);
    }

    // console.log(friendsUpdated);
    modifyFriends(friendsUpdated, user.uid);
  };

  if (userInfo.username === user.username) {
    return <></>;
  }

  if (isLoading) {
    return (
      <div className={style["profile-controls"]}>
        <div className={style.loading}>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className={style["profile-controls"]}>
      <button
        className={style.add}
        data-tooltip={isInFriendsList ? "Remove friend" : "Add friend"}
        onClick={setFriendsHandler}
      >
        <span className="material-symbols-outlined">
          {isInFriendsList ? "person_remove" : "person_add"}
        </span>
      </button>
    </div>
  );
}

export default FriendControls;
