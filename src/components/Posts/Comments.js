import Card from "../UI/Card";
import CreateComment from "./CreateComment";
import style from "./Comments.module.css";
import { useSelector } from "react-redux";
import usePost from "../../hooks/usePost";

function Comments(props) {
  const { comments } = props;
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
      <li key={"c" + i} className={style.comment}>
        <Card>
          <header className={style["comment-header"]}>
            <h5>{comment.author}</h5>
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
    <ul className={style.comments}>
      {props.edit && (
        <li>
          <CreateComment
            comments={comments}
            postId={props.postId}
            updateComments={props.updateComments}
          />
        </li>
      )}
      {commentsItems}
    </ul>
  );
}

export default Comments;
