import PropTypes from "prop-types";
import styles from "./SuccessNotification.module.scss";

function SuccessNotification({ successMessages }) {
  return (
    <div className={styles.successNotificationRootContainer}>
      {successMessages.map((message) => (
        <p key={message.split(0, 5)}>{message}</p>
      ))}
    </div>
  );
}

SuccessNotification.propTypes = {
  successMessages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SuccessNotification;
