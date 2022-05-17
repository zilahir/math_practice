import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./Button.module.scss";

function Button({
  label,
  onClickHandler,
  className,
  variant,
  containerClassName,
  disabled,
}) {
  return (
    <div className={classnames(styles.buttonContainer, containerClassName)}>
      <button
        className={classnames(styles.button, className, styles[variant])}
        type="button"
        onClick={onClickHandler}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
}

Button.defaultProps = {
  className: undefined,
  containerClassName: undefined,
  variant: "default",
  disabled: false,
};

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  containerClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  variant: PropTypes.string,
};

export default Button;
