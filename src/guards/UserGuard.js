import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function UserGuard(props) {
  const user = useSelector((state) => state.user);

  if (user.token.token) return <Navigate to="/" />;

  return <>{props.children}</>;
}

export default UserGuard;
