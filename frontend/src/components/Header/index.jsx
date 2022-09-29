import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthProvider";
import { USER } from "../../fakeApi/fakeUsers";
import menuApi, { LOGGEDIN, LOGGEDOUT } from "../../fakeApi/menuItems";

import MenuItem from "./components/MenuItem";
import styles from "./Header.module.scss";

function Header() {
  const location = useLocation();
  const { isAuthenticated, loggedInUser } = useAuth();

  function getMenuItems() {
    if (isAuthenticated) {
      return menuApi.getMenuItemsByUserLevelAndScope(
        loggedInUser.userLevel,
        LOGGEDIN,
      );
    }

    return menuApi.getMenuItemsByUserLevelAndScope(USER, LOGGEDOUT);
  }

  return (
    <header className={styles.headerRootContainer}>
      <ul className={styles.menuContainer}>
        {getMenuItems().map((value) => (
          <MenuItem
            key={value.target}
            isActive={
              (location.pathname.includes(value.target) &&
                value.target !== "/") ||
              (location.pathname === "/" && value.target === "/")
            }
            to={value.target}
            label={value.label}
          />
        ))}
      </ul>
    </header>
  );
}

export default Header;
