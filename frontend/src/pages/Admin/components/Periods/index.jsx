import { useState } from "react";

import useApi from "../../../../hooks/useAPI";
import apiEndpoints from "../../../../api/apiEndpoints";
import Button from "../../../../components/common/Button";
import Input from "../../../../components/common/Input";
import styles from "./Periods.module.scss";

function Periods() {
  const [period, setPeriod] = useState("");
  const { apiRequestHandler } = useApi({
    pathName: apiEndpoints.periods,
    method: "POST",
  });

  async function handlePeriodSave() {
    const newPeriod = {
      period,
    };

    await apiRequestHandler(newPeriod);
    console.log("period", newPeriod);
  }
  return (
    <div className={styles.periodsRootContainer}>
      <Input
        value={period}
        onChangeHandler={setPeriod}
        placeHolder="Időszak"
        inputLabel="Időszak"
      />
      <Button label="Mentés" onClickHandler={() => handlePeriodSave()} />
    </div>
  );
}

export default Periods;
