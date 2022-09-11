import Container from "./Container";
import style from "./PageList.module.css";

function PageList(props) {
  return (
    <Container>
      <h1 className={style.heading}>{props.heading}</h1>
      {!props.isEmpty && <ul className={style["list"]}>{props.listItems}</ul>}
      {props.isEmpty && (
        <p className={style["no-lists-items"]}>{props.messageOnEmptyList}</p>
      )}
    </Container>
  );
}

export default PageList;
