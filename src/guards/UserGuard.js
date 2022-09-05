import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useStorageToken from "../hooks/useStorageToken";

function UserGuard(props) {
  const user = useSelector((state) => state.user);

  useStorageToken();

  if (user.token) return <Navigate to="/home" />;

  return <>{props.children}</>;
}

export default UserGuard;
