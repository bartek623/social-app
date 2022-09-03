import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function GuestGuard(props) {
  const user = useSelector((state) => state.user);

  if (!user.token) return <Navigate to="/login" />;

  return <>{props.children}</>;
}

export default GuestGuard;
