import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./authActions";
import Loader from "../../components/Loader/Loader";

export default function AuthLoader({ children }) {
  const dispatch = useDispatch();
  const { isAuthChecked } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  // While we haven't completed the initial auth check, render a full-screen loader
  if (!isAuthChecked) {
    return <Loader />;
  }

  return children;
}
