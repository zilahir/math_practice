import { useState } from "react";

import useApi from "../../../../hooks/useAPI";
import apiEndpoints from "../../../../api/apiEndpoints";
import Button from "../../../../components/common/Button";
import Error from "../../../../components/common/Error";
import Input from "../../../../components/common/Input";
import styles from "./Periods.module.scss";

function Periods() {
  const [period, setPeriod] = useState("");
  const [errors, setErrors] = useState([]);
  const { apiRequestHandler } = useApi({
    pathName: apiEndpoints.periods,
    method: "POST",
  });

  async function handlePeriodSave() {
    if (period.length === 0) {
      setErrors((currentErrors) => [
        ...currentErrors,
        "Az időszak nem lehet üres",
      ]);
    } else {
      const newPeriod = {
        period,
      };

      await apiRequestHandler(newPeriod);
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
