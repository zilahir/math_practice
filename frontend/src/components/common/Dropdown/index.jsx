import PropTypes from "prop-types";

import styles from "./Dropdown.module.scss";

function DropDown({ labelValue, id, options, setValue, loading }) {
  function handleChange(event) {
    const selectedObject = options[event.target.options.selectedIndex];
    setValue(selectedObject);
  }
  return (
    <div className={styles.dropDownRootContainer}>
      <label htmlFor={id}>{labelValue}</label>
      {!loading ? (
        <select onChange={(event) => handleChange(event)} name={id} id={id}>
          {options.map((option) => (
            <option key={options.value} value={options.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

DropDown.propTypes = {
  labelValue: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setValue: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default DropDown;
