import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";

import styles from "./MenuItem.module.scss";

function MenuItem({ label, to, isActive }) {
  return (
    <li className={classnames(styles.menuItem, isActive && styles.active)}>
      <Link to={to}>
        {label}
      </Link>
    </li>
  );
}

MenuItem.defaultProps = {
  isActive: false,
};

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

export default MenuItem;
