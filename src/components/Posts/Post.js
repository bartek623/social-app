import style from "./Post.module.css";

function Post(props) {
  const date = new Intl.DateTimeFormat("en-GB").format(
    new Date(props.post.date)
  );
  return (
    <li className={style.post}>
      <header className={style["post-header"]}>
        <h4 className={style.author}>{props.post.author}</h4>
        <span className={style.date}>{date}</span>
      </header>
      <p className={style.content}>{props.post.content}</p>
    </li>
  );
}

export default Post;
