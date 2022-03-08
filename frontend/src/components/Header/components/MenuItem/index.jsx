/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function MenuItem({ label, to }) {
  return (
    <li>
      <Link to={to}>
        {label}
      </Link>
    </li>
  );
}

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default MenuItem;
