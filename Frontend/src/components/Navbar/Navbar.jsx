import { NavLink } from "react-router-dom";
import styles from './NavBar.module.css';

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <NavLink
                to="/"
                className={(e) => `${styles.link} ${e.isActive ? styles.active : ''}`}>
                Home
            </NavLink>
            <NavLink
                to="/login"
                className={(e) => `${styles.link} ${e.isActive ? styles.active : ''}`}>
                Login
            </NavLink>
        </div>
    );
}

export default Navbar;
