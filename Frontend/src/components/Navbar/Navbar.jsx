import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (userInfo) {
      // console.log("Navbar userInfo:", userInfo);
    }
  }, [userInfo]);

  return (
    <div className={styles.navbar}>
      <NavLink
        to="/"
        className={(e) => `${styles.link} ${e.isActive ? styles.active : ""}`}
      >
        Home
      </NavLink>

      {userInfo && userInfo.id ? (
        <>
          <NavLink
            to="/profile"
            className={(e) =>
              `${styles.link} ${e.isActive ? styles.active : ""}`
            }
          >
            Profile
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/login"
            className={(e) =>
              `${styles.link} ${e.isActive ? styles.active : ""}`
            }
          >
            Login
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Navbar;
