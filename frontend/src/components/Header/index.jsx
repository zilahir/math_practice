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
  menuItem: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
  })).isRequired,
};

export default Header;
