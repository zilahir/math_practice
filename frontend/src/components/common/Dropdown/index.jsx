import PropTypes from "prop-types";

import styles from "./Dropdown.module.scss";

function DropDown({ labelValue, id, options, setValue }) {
  function handleChange(event) {
    const selectedObject = options[event.target.options.selectedIndex];
    setValue(selectedObject);
  }
  return (
    <div className={styles.dropDownRootContainer}>
      <label htmlFor={id}>{labelValue}</label>
      <select onChange={(event) => handleChange(event)} name={id} id={id}>
        {options.map((option) => (
          <option value={options.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

DropDown.propTypes = {
  labelValue: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default DropDown;
