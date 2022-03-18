import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import MenuItem from "./components/MenuItem";
import styles from "./Header.module.scss";

function Header({ menuItem }) {
  const location = useLocation();
  return (
    <header className={styles.headerRootContainer}>
      <ul className={styles.menuContainer}>
        {
            menuItem.map((value) => (
              <MenuItem
                isActive={value.target === location.pathname}
                to={value.target}
                label={value.label}
              />
            ))
        }
      </ul>
    </header>
  );
}

Header.propTypes = {
  menuItem: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
  })).isRequired,
};

export default Header;
