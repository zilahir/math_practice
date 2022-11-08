import { useState } from "react";

import useApi from "../../../../hooks/useAPI";
import apiEndpoints from "../../../../api/apiEndpoints";
import Button from "../../../../components/common/Button";
import Error from "../../../../components/common/Error";
import Input from "../../../../components/common/Input";
import styles from "./Periods.module.scss";
import SuccessNotification from "../../../../components/common/components/SuccessNotification";

function Periods() {
  const [period, setPeriod] = useState("");
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const { apiRequestHandler } = useApi({
    pathName: apiEndpoints.periods,
    method: "POST",
  });

  async function handlePeriodSave() {
    setSuccessMessage(undefined);
    if (period.length === 0) {
      setErrors((currentErrors) => [
        ...currentErrors,
        "Az időszak nem lehet üres",
      ]);
    } else {
      const newPeriod = {
        period,
      };

      await apiRequestHandler(newPeriod).then(() => {
        setSuccessMessage("Az időszak sikeresen mentve!");
      });
      setPeriod("");
    }
  }
  return (
    <div className={styles.periodsRootContainer}>
      {errors.length > 0 &&
        errors.map((error) => (
          <Error
            key={error.substring(0, 5).replace(" ", "")}
            errorText={error}
          />
        ))}
      {successMessage && (
        <SuccessNotification successMessages={[successMessage]} />
      )}
      <Input
        value={period}
        onChangeHandler={setPeriod}
        placeHolder="Időszak"
        inputLabel="Új érettségi időszak felvétele"
        className={styles.newPeriodInput}
        htmlFor="period"
      />
      <Button
        className={styles.saveNewPeriod}
        label="Mentés"
        onClickHandler={() => handlePeriodSave()}
      />
    </div>
  );
}

export default Periods;
