import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./Input.module.scss";

function Input({
  value,
  onChangeHandler,
  inputType,
  placeHolder,
  className,
}) {
  return (
    <div className={classnames(styles.inputContainer, className)}>
      <input
        type={inputType}
        value={value}
        onChange={(event) => onChangeHandler(event.target.value)}
        placeholder={placeHolder}
      />
    </div>
  );
}

Input.defaultProps = {
  className: undefined,
  inputType: "text",
};

Input.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  inputType: PropTypes.oneOf(["text", "password"]),
  placeHolder: PropTypes.string.isRequired,
};

export default Input;
