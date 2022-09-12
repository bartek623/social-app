import { useSelector } from "react-redux";

import Card from "../UI/Card";
import CreateComment from "./CreateComment";
import usePost from "../../hooks/usePost";
import style from "./Comments.module.css";
import themeStyle from "../UI/theme.module.css";
import { Link } from "react-router-dom";

function Comments(props) {
  const { comments, edit } = props;
  const user = useSelector((state) => state.user);
  const { setComment } = usePost();

  const deleteCommentHandler = function (e) {
    const commentIndex = +e.target.dataset.index;

    const newComments = [
      ...comments.slice(0, commentIndex),
      ...comments.slice(commentIndex + 1),
    ];

    props.updateComments(newComments);
    setComment(props.postId, newComments);
  };

  let commentsItems = (
    <Card>
      <span className={style["not-found"]}>No comments yet</span>
    </Card>
  );

  if (comments?.length > 0) {
    commentsItems = comments.map((comment, i) => (
      <li key={"c" + i} className={`${style.comment} ${themeStyle.container}`}>
        <Card>
          <header className={style["comment-header"]}>
            <h5>
              <Link to={`/profile/${comment.authorId}`}>{comment.author}</Link>
            </h5>
            {user.username === comment.author && (
              <button
                className="material-symbols-outlined"
                onClick={deleteCommentHandler}
                data-index={i}
              >
                delete
              </button>
            )}
          </header>
          <p>{comment.content}</p>
        </Card>
      </li>
    ));
  }

  return (
    <ul className={`${style.comments} ${themeStyle.container}`}>
      {edit && (
        <li>
          <CreateComment
            comments={comments}
            postId={props.postId}
            authorId={props.authorId}
            updateComments={props.updateComments}
            hideEdit={props.hideEdit}
          />
        </li>
      )}
      {commentsItems}
    </ul>
  );
}

export default Comments;
