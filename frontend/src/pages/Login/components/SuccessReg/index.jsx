import styles from "./SuccessReg.module.scss";

function SuccessReg() {
  return (
    <div className={styles.successRegRootContainer}>
      <p>Sikeres regisztráció!</p>
      <p>A folytatáshoz lépj be!</p>
    </div>
  );
}

export default SuccessReg;
