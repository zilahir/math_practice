/* eslint-disable no-nested-ternary */
import ReactDOM from "react-dom";
import classnames from "classnames";
import PropTypes from "prop-types";

import styles from "./Loader.module.scss";

function Loader({ isLoading, className, isPortal }) {
  return isLoading && !isPortal ? (
    <div
      className={classnames([
        styles.loaderRootContainer,
        className && className,
      ])}
    >
      <div className={styles.loader}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  ) : isLoading && isPortal ? (
    ReactDOM.createPortal(
      <div
        className={classnames([
          styles.loaderRootContainer,
          styles.portal,
          className && className,
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
  ) : null;
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
