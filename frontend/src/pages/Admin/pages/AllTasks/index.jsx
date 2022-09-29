import { useState } from "react";
import { sortBy } from "lodash";
import classnames from "classnames";

import { apiEndpoints } from "../../../../api";
import SuccessNotification from "../../../../components/common/components/SuccessNotification";
import DropDown from "../../../../components/common/Dropdown";
import Task from "../../../../components/common/Task";
import useApi from "../../../../hooks/useAPI";
import { getPeriodTimeStamp } from "../../../../utils/periods";
import styles from "./AllTasks.module.scss";
import Loader from "../../../../components/common/Loader";

function AllTask() {
  const [isDeleted, setIsDeleted] = useState(false);
  const [period, setPeriod] = useState(null);
  const { apiReponse, loading } = useApi({
    method: "GET",
    pathName: apiEndpoints.allTask,
  });

  const [filteredTasks, setFilteredTasks] = useState([]);

  const { apiRequestHandler } = useApi({
    method: "POST",
    pathName: apiEndpoints.deleteTask,
  });

  function handleTaskDelete(taskId) {
    apiRequestHandler({
      taskId,
    }).then(() => {
      setIsDeleted(true);
      setTimeout(() => {
        setIsDeleted(false);
      }, 3000);
    });
  }

  const { apiReponse: periods } = useApi({
    method: "GET",
    pathName: apiEndpoints.periods,
  });

  function transformPeriodApiResponse() {
    if (periods && Array.isArray(periods)) {
      const resp = periods.map((currentPeriod) => ({
        label: currentPeriod.periodName,
        value: currentPeriod.id,
        periodTimestamp: getPeriodTimeStamp(currentPeriod.periodName),
      }));

      return sortBy(resp, ["periodTimestamp"]);
    }

    return [];
  }

  function handleFilter(selectedPeriod) {
    const periodId = selectedPeriod.value;
    const filtered = apiReponse.filter(
      ({ period_id: thisPeriodId }) => thisPeriodId === periodId,
    );
    setPeriod(selectedPeriod);
    setFilteredTasks(filtered);
  }

  return (
    <div>
      {isDeleted && (
        <SuccessNotification
          successMessages={["A feladat sikeresen törölve!"]}
        />
      )}
      <div className={styles.adminFilterRootContainer}>
        <div className={classnames([styles.filter, period && styles.inline])}>
          <h1>Feladat módosítása, törlése</h1>
          <DropDown
            options={transformPeriodApiResponse()}
            labelValue="Válassz időszakot"
            id="period"
            setValue={(pperiod) => handleFilter(pperiod)}
            value={period}
            className={styles.dropdownHelper}
            isMulti={false}
          />
        </div>
      </div>
      {filteredTasks &&
      Array.isArray(filteredTasks) &&
      filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <Task
            handleTaskDelete={() => handleTaskDelete(task.id)}
            task={task}
            key={task.id}
          />
        ))
      ) : (
        <Loader isLoading={loading} />
      )}
    </div>
  );
}

export default AllTask;
