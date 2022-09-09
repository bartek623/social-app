import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PostControl from "./PostControl";
import style from "./Post.module.css";
import Comments from "./Comments";
import Card from "../UI/Card";

function Post(props) {
  const [showComments, setShowComments] = useState(false);
  const [editComments, setEditComments] = useState(false);
  const [comments, setComments] = useState(props.post.comments);
  const user = useSelector((state) => state.user);
  const isUserAuthor = user.username === props.post.author;
  const isFriend = user.friends?.some(
    (friend) => friend.username === props.post.author
  );

  const tags = props.post.tags || [];

  const tagsTransformed = tags?.map((tag, i) => (
    <li key={"tag" + i} className={style["tags__tag"]}>
      <Link to={`/explore/${tag}`}>{tag}</Link>
    </li>
  ));

  const commentsHandler = function (edit = false) {
    if (!edit) {
      setShowComments((prevState) => !prevState);
      setEditComments(false);
    }

    if (edit) {
      setEditComments(true);
      setShowComments(true);
    }
  };

  const deleteHandler = function () {
    props.onPostDelete(props.post.postId);
  };

  return (
    <li className={style["post-item"]}>
      <section>
        <Card>
          {tags.length > 0 && (
            <div className={style.tags}>
              <ul className={style["tags__label"]}>Tags: </ul>
              <div className={style["tags__box"]}>{tagsTransformed}</div>
            </div>
          )}
          <header className={style["post-header"]}>
            <Link to={`/profile/${props.post.authorId}`}>
              {props.post.author}
              {isFriend && (
                <span
                  className="material-symbols-outlined"
                  data-tooltip="Friend"
                >
                  group
                </span>
              )}
              {isUserAuthor && (
                <span className="material-symbols-outlined" data-tooltip="Me">
                  person
                </span>
              )}
            </Link>
            <div className={style["header-right"]}>
              <span className={style.date}>{props.post.date}</span>
              {isUserAuthor && (
                <button
                  className="material-symbols-outlined"
                  onClick={deleteHandler}
                >
                  delete
                </button>
              )}
            </div>
          </header>
          <p className={style.content}>{props.post.content}</p>
          <PostControl
            postId={props.post.postId}
            likes={props.post.likedBy}
            comments={comments}
            showComments={commentsHandler}
          />
        </Card>
        {showComments && (
          <div className={style.comments}>
            <Comments
              postId={props.post.postId}
              edit={editComments}
              comments={comments || []}
              updateComments={setComments}
            />
          </div>
        )}
      </section>
    </li>
  );
}

export default Post;
