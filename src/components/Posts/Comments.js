import Card from "../UI/Card";
import CreateComment from "./CreateComment";
import style from "./Comments.module.css";

function Comments(props) {
  const { comments } = props;

  let commentsItems = (
    <Card>
      <span className={style["not-found"]}>No comments yet</span>
    </Card>
  );

  if (comments?.length > 0) {
    commentsItems = comments.map((comment, i) => (
      <li key={"c" + i} className={style.comment}>
        <Card>
          <h5>{comment.author}</h5>
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
