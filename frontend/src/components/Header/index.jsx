import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthProvider";
import menuApi, { LOGGEDIN } from "../../fakeApi/menuItems";

import MenuItem from "./components/MenuItem";
import styles from "./Header.module.scss";

function getMenuItems(hasAuth, scope) {
  console.log('hasAuth', hasAuth, scope);
  if (!hasAuth) {
    return menuApi.menuItems;
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
        {
            getMenuItems(isAuthenticated, loggedInUser.userLevel).map((value) => (
              <MenuItem
                isActive={value.target === location.pathname}
                to={value.target}
                label={value.label}
                key={value.target}
              />
            ))
        }
      </ul>
    </header>
  );
}

export default Header;
