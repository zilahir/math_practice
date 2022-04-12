import PropTypes from "prop-types";

import styles from "./Error.module.scss";

function Error({ errorText }) {
  return (
    <div className={styles.errorRootContainer}>
      <p>{errorText}</p>
    </div>
  );
}

Error.propTypes = {
  errorText: PropTypes.string.isRequired,
};

export default Error;
