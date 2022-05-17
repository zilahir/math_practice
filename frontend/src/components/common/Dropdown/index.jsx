import PropTypes from "prop-types";
import Select from "react-select";

import styles from "./Dropdown.module.scss";

function DropDown({
  labelValue,
  id,
  options,
  setValue,
  value,
  loading,
  isMulti,
}) {
  function handleChange(event) {
    setValue(event);
  }
  return (
    <div className={styles.dropDownRootContainer}>
      <p>{labelValue}</p>
      <Select
        onChange={(event) => handleChange(event)}
        options={options}
        defaultValue={value}
        name={id}
        isLoading={loading}
        placeholder={labelValue}
        isMulti={isMulti}
      />
    </div>
  );
}

DropDown.defaultProps = {
  isMulti: false,
};

DropDown.propTypes = {
  labelValue: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    }),
  ).isRequired,
  setValue: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  isMulti: PropTypes.bool,
};

export default DropDown;
