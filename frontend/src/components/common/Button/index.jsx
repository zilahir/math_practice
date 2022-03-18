import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./Button.module.scss";

function Button({ label, onClickHandler, className }) {
  return (
    <div className={styles.buttonContainer}>
      <button
        className={classnames(styles.button, className)}
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
};

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};

export default Button;
