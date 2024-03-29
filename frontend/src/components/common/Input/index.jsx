import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./Input.module.scss";

function Input({
  value,
  onChangeHandler,
  inputType,
  placeHolder,
  className,
  inputLabel,
  htmlFor,
}) {
  return (
    <div className={classnames(styles.inputContainer, className)}>
      {inputLabel && <label htmlFor={htmlFor}>{inputLabel}</label>}
      <input
        type={inputType}
        value={value}
        onChange={(event) => onChangeHandler(event.target.value)}
        placeholder={placeHolder && placeHolder}
      />
    </div>
  );
}

Input.defaultProps = {
  className: undefined,
  inputType: "text",
  inputLabel: false,
  value: undefined,
  placeHolder: undefined,
};

Input.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeHandler: PropTypes.func.isRequired,
  inputType: PropTypes.oneOf(["text", "password", "number"]),
  placeHolder: PropTypes.string,
  inputLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  htmlFor: PropTypes.string.isRequired,
};

export default Input;
