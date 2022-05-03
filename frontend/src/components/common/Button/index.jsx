import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./Button.module.scss";

function Button({ label, onClickHandler, className, variant }) {
  return (
    <div className={styles.buttonContainer}>
      <button
        className={classnames(styles.button, className, styles[variant])}
        type="button"
        onClick={onClickHandler}
      >
        {label}
      </button>
    </div>
  );
}

Button.defaultProps = {
  className: undefined,
  variant: "default",
};

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  variant: PropTypes.string,
};

export default Button;
