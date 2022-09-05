import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import useStorageToken from "../hooks/useStorageToken";

function GuestGuard(props) {
  const user = useSelector((state) => state.user);

  useStorageToken();

  if (!user.token) return <Navigate to="/login" />;

  return <>{props.children}</>;
}

export default GuestGuard;
