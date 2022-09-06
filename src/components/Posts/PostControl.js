import { useState } from "react";
import { useSelector } from "react-redux";
import usePost from "../../hooks/usePost";
import themeStyle from "../UI/theme.module.css";
import style from "./PostControl.module.css";

function PostControl(props) {
  const user = useSelector((state) => state.user);
  const { likePost } = usePost();
  const [likes, setLikes] = useState(props.likes || []);

  const likesAmount = likes?.length || "0";
  const isLiked = likes?.includes(user.username) || false;
  const commentsAmount = props.comments?.length || "0";

  const likeHandler = function () {
    let newLikes;

    if (!isLiked) newLikes = [...likes, user.username];

    if (isLiked) newLikes = likes.filter((liked) => liked !== user.username);

    setLikes(newLikes);
    likePost(props.postId, newLikes);
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
        <div className={style.stats}>
          <span>{commentsAmount}</span>
          <span className={`material-symbols-outlined ${style.icon}`}>
            comment
          </span>
        </div>
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
        <button className={themeStyle.btn}>
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