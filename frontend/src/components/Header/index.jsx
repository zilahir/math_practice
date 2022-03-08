/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/forbid-prop-types */
import PropTypes from "prop-types";
import MenuItem from "./components/MenuItem";

function Header({ menuItem }) {
  return (
    <header>
      <ul>
        {
            menuItem.map((value) => (
              <MenuItem to={value.target} label={value.label} />
            ))
        }
      </ul>
    </header>
  );
}

Header.propTypes = {
  menuItem: PropTypes.array.isRequired,
};

export default Header;
