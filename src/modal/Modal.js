import { useRef } from "react";
import { useSelector } from "react-redux";
import style from "./Modal.module.css";

const getTags = function (text) {
  const textWords = text.split(" ");
  const tags = textWords.filter(
    (word) => word[0] === "#" && word.trim().length > 1
  );
  return tags;
};

function Modal(props) {
  const user = useSelector((state) => state.user);
  const contentInputRef = useRef();

  const submitHandler = function (e) {
    e.preventDefault();

    const content = contentInputRef.current.value;
    const date = new Intl.DateTimeFormat("en-GB").format(new Date(Date.now()));

    const postInfo = {
      author: user.username,
      authorId: user.uid,
      content,
      date: date,
      likedBy: null,
      comments: null,
      tags: getTags(content),
    };

    props.createPost(postInfo);
    props.onClose();
  };

  return (
    <form className={style.modal} onSubmit={submitHandler}>
      <textarea ref={contentInputRef} required></textarea>
      <button type="submit">Create New Post</button>
    </form>
  );
}

export default Modal;
