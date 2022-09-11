import { useSelector } from "react-redux";
import Card from "../UI/Card";
import PageList from "../UI/PageList";

function Notifications() {
  const user = useSelector((state) => state.user);
  const { notifications } = user;

  const notificationsItems = notifications?.map((notif, i) => (
    <li key={"notif" + i}>
      <Card>{notif.notification}</Card>
    </li>
  ));

  const heading = "Notifications";
  const noNotifications = "You have not any notifications yet!";

  return (
    <PageList
      heading={heading}
      messageOnEmptyList={noNotifications}
      listItems={notificationsItems}
      isEmpty={notifications.length < 1}
    />
  );
}

export default Notifications;
