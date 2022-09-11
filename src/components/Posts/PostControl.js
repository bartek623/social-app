import { useState } from "react";
import { useSelector } from "react-redux";
import usePost from "../../hooks/usePost";
import useUser from "../../hooks/useUser";
import themeStyle from "../UI/theme.module.css";
import style from "./PostControl.module.css";

function PostControl(props) {
  const user = useSelector((state) => state.user);
  const { likePost } = usePost();
  const { pushNotification } = useUser();
  const [likes, setLikes] = useState(props.likes ? props.likes : []);

  const likesAmount = likes?.length || "0";
  const isLiked = likes?.includes(user.username) || false;
  const commentsAmount = props.comments?.length || "0";

  const likeHandler = function () {
    let newLikes;

    if (!isLiked) {
      newLikes = [...likes, user.username];

      // Push new notifications to author of post
      const notification = `${user.username} liked your post!`;
      pushNotification(notification, props.authorId);
    }

    if (isLiked) newLikes = likes.filter((liked) => liked !== user.username);

    setLikes(newLikes);
    likePost(props.postId, newLikes);
  };

  const editCommentHandler = function () {
    props.showComments(true);
  };

  const showCommentHandler = function () {
    props.showComments(false);
  };

  return (
    <div className={style.control}>
      <div className={style.reactions}>
        <div className={style.stats}>
          <span>{likesAmount}</span>
          <span
            className={`material-symbols-outlined ${style.icon} ${style.star}`}
          >
            star
          </span>
        </div>
        <button className={style.stats} onClick={showCommentHandler}>
          <span>{commentsAmount}</span>
          <span className={`material-symbols-outlined ${style.icon}`}>
            comment
          </span>
        </button>
      </div>

      <div className={style.btns}>
        <button
          className={`${themeStyle.btn} ${isLiked ? style.liked : ""}`}
          onClick={likeHandler}
        >
          <span
            className={`material-symbols-outlined ${style.icon} ${style.star}`}
          >
            star
          </span>
          <span>Like</span>
        </button>
        <button className={themeStyle.btn} onClick={editCommentHandler}>
          <span className={`material-symbols-outlined ${style.icon}`}>
            comment
          </span>
          <span>Comment</span>
        </button>
      </div>
    </div>
  );
}

export default PostControl;
