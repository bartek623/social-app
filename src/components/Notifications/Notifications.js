import { useSelector } from "react-redux";
import Container from "../UI/Container";
import Card from "../UI/Card";
import style from "./Notifications.module.css";

function Notifications() {
  const user = useSelector((state) => state.user);
  const { notifications } = user;
  console.log(notifications);

  const notificationsItems = notifications?.map((notif, i) => (
    <li key={"notif" + i} className={style["notifications-list__notification"]}>
      <Card>{notif.notification}</Card>
    </li>
  ));

  return (
    <Container>
      <h1 className={style.heading}>Notifications</h1>
      {notifications?.length > 0 && (
        <ul className={style["notifications-list"]}>{notificationsItems}</ul>
      )}
      {!notifications?.length > 0 && (
        <p className={style["no-notifications"]}>
          You have not any notifications yet!
        </p>
      )}
    </Container>
  );
}

export default Notifications;
