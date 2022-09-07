import { Link } from "react-router-dom";

import PostControl from "./PostControl";
import style from "./Post.module.css";
import { useState } from "react";
import Comments from "./Comments";
import Card from "../UI/Card";
import { useSelector } from "react-redux";
import useLoadPosts from "../../hooks/useLoadPosts";

function Post(props) {
  const [showComments, setShowComments] = useState(false);
  const [editComments, setEditComments] = useState(false);
  const [comments, setComments] = useState(props.post.comments);
  const user = useSelector((state) => state.user);
  const isUserAuthor = user.username === props.post.author;
  const { deletePostHandler } = useLoadPosts();

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

  const deleteHandler = function () {
    deletePostHandler(props.post.postId);
  };

  return (
    <li className={style["post-item"]}>
      <section>
        <Card>
          <header className={style["post-header"]}>
            <Link to={`/profile/${props.post.authorId}`}>
              {props.post.author}
            </Link>
            <div className={style["header-right"]}>
              <span className={style.date}>{date}</span>
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
