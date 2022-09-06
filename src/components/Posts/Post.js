import { Link } from "react-router-dom";

import PostControl from "./PostControl";
import style from "./Post.module.css";
import { useState } from "react";
import Comments from "./Comments";
import Card from "../UI/Card";

function Post(props) {
  const [showComments, setShowComments] = useState(false);
  const [editComments, setEditComments] = useState(false);
  const [comments, setComments] = useState(props.post.comments);

  const date = new Intl.DateTimeFormat("en-GB").format(
    new Date(props.post.date || Date.now())
  );

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

  return (
    <li className={style["post-item"]}>
      <section>
        <Card>
          <header className={style["post-header"]}>
            <Link to={`/profile/${props.post.authorId}`}>
              {props.post.author}
            </Link>
            <span className={style.date}>{date}</span>
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
