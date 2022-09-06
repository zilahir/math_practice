import ReactDOM from "react-dom";
import classnames from "classnames";
import PropTypes from "prop-types";

import styles from "./Loader.module.scss";

function Loader({ isLoading, className, isPortal }) {
  return !isPortal ? (
    <div
      className={classnames([
        styles.loaderRootContainer,
        className && className,
        !isLoading && styles.hidden,
      ])}
    >
      <div className={styles.loader}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  ) : (
    ReactDOM.createPortal(
      <div
        className={classnames([
          styles.loaderRootContainer,
          styles.portal,
          className && className,
          !isLoading && styles.hidden,
        ])}
      >
        <div className={styles.loader}>
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>,
      document.body,
    )
  );
}

Loader.defaultProps = {
  className: null,
  isPortal: false,
};

Loader.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isPortal: PropTypes.bool,
};

export default Loader;
