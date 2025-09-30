import { useDispatch, useSelector } from "react-redux";
import styles from "./UserProfile.module.css";
import { toast } from "react-toastify";
import { logoutUser } from "../../features/Auth/authActions";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error, userInfo, message } = useSelector((state) => state.authReducer);
  // console.log("userInfo:", userInfo);

  const LogoutHandler = async () => {
    const toastId = toast.loading("Logging out...");
    // Implement logout functionality here
    try {
      const payload = await dispatch(logoutUser()).unwrap();
      toast.update(toastId, {
        render: payload?.message || "Logout Successful",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate("/login");
    } catch (err) {
      const message = err?.message || err || "Something went wrong";
      toast.update(toastId, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  }

  return (
    <div className={styles.userProfile}>
      {userInfo && userInfo.profilePic && (
        <img
          src={userInfo.profilePic}
          alt={`${userInfo.fullName}'s avatar`}
          className={styles.profilePic}
        />
      )}
      <div className={styles.userInfo}>
        <h2 className={styles.fullName}>{userInfo?.fullName || "No Name"}</h2>
        <h2 className={styles.username}>{userInfo?.username || "No Name"}</h2>
        <p>Email: {userInfo?.email || "No Email"}</p>
        <p>Bio: {userInfo?.bio || "No Bio"}</p>
      </div>

      <button className={styles.logoutHandler} type="submit" onClick={LogoutHandler}>Logout</button>
    </div>
  );
};

export default UserProfile;
