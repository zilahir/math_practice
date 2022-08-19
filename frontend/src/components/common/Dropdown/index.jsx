import PropTypes from "prop-types";
import classnames from "classnames";

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
  className,
}) {
  function handleChange(event) {
    setValue(event);
  }
  return (
    <div
      className={classnames([
        styles.dropDownRootContainer,
        className && className,
      ])}
    >
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
  className: null,
};

DropDown.propTypes = {
  labelValue: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
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
