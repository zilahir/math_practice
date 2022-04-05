import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthProvider";
import { USER } from "../../fakeApi/fakeUsers";
import menuApi, { LOGGEDIN, LOGGEDOUT } from "../../fakeApi/menuItems";

import MenuItem from "./components/MenuItem";
import styles from "./Header.module.scss";

/**
 * @param hasAuth
 * @param scope
 */
function getMenuItems(hasAuth, scope) {
  if (!hasAuth) {
    return menuApi.getMenuItemsForScope(LOGGEDOUT, USER);
  }

  const loggedInMenuItems = menuApi.getMenuItemsForScope(LOGGEDIN, scope);
  return loggedInMenuItems;
}

function Header() {
  const location = useLocation();
  const { isAuthenticated, loggedInUser } = useAuth();
  return (
    <header className={styles.headerRootContainer}>
      <ul className={styles.menuContainer}>
        {getMenuItems(
          isAuthenticated,
          loggedInUser ? loggedInUser.userLevel : USER,
        ).map((value) => (
          <MenuItem
            key={value.target}
            isActive={value.target === location.pathname}
            to={value.target}
            label={value.label}
          />
        ))}
      </ul>
    </header>
  );
}

export default Header;
