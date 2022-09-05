import { useRef } from "react";
import { useSelector } from "react-redux";
import style from "./Modal.module.css";

function Modal(props) {
  const user = useSelector((state) => state.user);
  const contentInputRef = useRef();

  const submitHandler = function (e) {
    e.preventDefault();

    const content = contentInputRef.current.value;

    const postInfo = {
      author: user.username,
      authorId: user.uid,
      content,
      date: new Date(),
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
