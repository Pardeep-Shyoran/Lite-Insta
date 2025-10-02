import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Navbar from "../components/Navbar/Navbar";
import Profile from "../pages/Profile/Profile";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreatePost from "../pages/CreatePost/CreatePost";
import EditProfile from "../pages/EditProfile/EditProfile";
import PostDetails from "../pages/PostDetails/PostDetails";
import UpdatePost from "../pages/UpdatePost/UpdatePost";

const MainRoutes = () => {
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.authReducer);

  // Define valid paths where Navbar should be shown
  const validPaths = [
    "/",
    "/login",
    "/register",
    "/profile",
    "/createpost",
    "/editprofile",
    "/post/${id}",
    "/update-post/${id}",
  ];

  const hideNavbar =
    !validPaths.includes(location.pathname) &&
    !/^\/post\/[^/]+$/.test(location.pathname) &&
    !/^\/update-post\/[^/]+$/.test(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route
          path="/"
          element={
            userInfo && userInfo.id ? (
              <Home />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={
            userInfo && userInfo.id ? (
              <Navigate to="/profile" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/register"
          element={
            userInfo && userInfo.id ? (
              <Navigate to="/profile" replace />
            ) : (
              <Register />
            )
          }
        />

        <Route
          path="/profile"
          element={
            userInfo && userInfo.id ? (
              <Profile />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/createpost"
          element={
            userInfo && userInfo.id ? (
              <CreatePost />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/editprofile"
          element={
            userInfo && userInfo.id ? (
              <EditProfile />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/post/:id"
          element={
            userInfo && userInfo.id ? (
              <PostDetails />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/update-post/:id"
          element={
            userInfo && userInfo.id ? (
              <UpdatePost />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
