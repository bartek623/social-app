import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useStorageToken from "../hooks/useStorageToken";

import LoadingSpinner from "../components/UI/LoadingSpinner";

function UserGuard(props) {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const catchToken = useStorageToken();

  useEffect(() => {
    catchToken();
    setIsLoading(false);
  }, [catchToken]);

  if (isLoading) return <LoadingSpinner />;

  if (user.token) {
    console.log("You are already logged in");
    return <Navigate to="/home" />;
  }

  return <>{props.children}</>;
}

export default UserGuard;
