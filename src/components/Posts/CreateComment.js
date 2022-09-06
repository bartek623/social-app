import { useRef } from "react";
import { useSelector } from "react-redux";

import usePost from "../../hooks/usePost";
import Card from "../UI/Card";
import style from "./CreateComment.module.css";
import themeStyle from "../UI/theme.module.css";

function CreateComment(props) {
  const user = useSelector((state) => state.user);
  const { setComment } = usePost();
  const contentInputRef = useRef();

  const submitHandler = function (e) {
    e.preventDefault();

    const comment = {
      author: user.username,
      content: contentInputRef.current.value,
    };

    const newComments = [comment, ...props.comments];

    props.updateComments(newComments);
    setComment(props.postId, newComments);
  };

  return (
    <Card>
      <form className={style.comment} onSubmit={submitHandler}>
        <textarea ref={contentInputRef} required></textarea>
        <button type="submit" className={themeStyle.btn}>
          <span className="material-symbols-outlined">send</span>
        </button>
      </form>
    </Card>
  );
}

export default CreateComment;
