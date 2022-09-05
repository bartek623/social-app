import { Link } from "react-router-dom";
import style from "./Post.module.css";

function Post(props) {
  const date = new Intl.DateTimeFormat("en-GB").format(
    new Date(props.post.date)
  );

  return (
    <li className={style.post}>
      <header className={style["post-header"]}>
        <Link to={`/profile/${props.post.authorId}`}>{props.post.author}</Link>
        <span className={style.date}>{date}</span>
      </header>
      <p className={style.content}>{props.post.content}</p>
    </li>
  );
}

export default Post;
