/* eslint-disable react/no-unstable-nested-components */
import { useState, useCallback } from "react";
import classnames from "classnames";

import { apiEndpoints } from "../../api";
import Button from "../../components/common/Button";
import DropDown from "../../components/common/Dropdown";

import { useAuth } from "../../context/AuthContext/AuthProvider";
import useApi from "../../hooks/useAPI";
import styles from "./Tasks.module.scss";
import Task from "../../components/common/Task";

function Tasks() {
  const { isAuthenticated } = useAuth();
  const [category, setCategory] = useState(null);
  const [period, setPeriod] = useState(null);
  const [selectedFilterType, setFilterType] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState(null);

  const FILTER_BY_PERIOD = "FILTER_BY_PERIOD";
  const FILTER_BY_CATEGORIES = "FILTER_BY_CATEGORIES";

  const filterTypes = [
    { label: "Időszak alapján", filterType: FILTER_BY_PERIOD },
    { label: "Témakör alapján", filterType: FILTER_BY_CATEGORIES },
  ];

  function changeFilterType(chosenFilterType) {
    setCategory(null);
    setPeriod(null);
    setFilteredTasks(null);
    setFilterType(chosenFilterType);
  }

  const { apiReponse: categories } = useApi({
    method: "GET",
    pathName: apiEndpoints.categories,
  });

  const { apiReponse: periods } = useApi({
    method: "GET",
    pathName: apiEndpoints.periods,
  });

  const { apiReponse: allTasks } = useApi({
    method: "GET",
    pathName: apiEndpoints.allTask,
  });

  function transformPeriodApiRespnse() {
    if (periods && Array.isArray(periods)) {
      return periods.map((currentPeriod) => ({
        label: currentPeriod.periodName,
        value: currentPeriod.id,
      }));
    }

    return [];
  }

  function transformCategoriesApiResponse() {
    if (categories && Array.isArray(categories)) {
      return categories.map((currentCat) => ({
        label: currentCat.name,
        value: currentCat.id,
      }));
    }

    return [];
  }

  function filterTasksByLogic() {
    if (Array.isArray(allTasks) && allTasks.length > 0) {
      if (selectedFilterType === FILTER_BY_PERIOD) {
        const tasks = allTasks.filter(
          (task) => task.period_id === period.value,
        );
        setFilteredTasks(tasks);
      } else if (selectedFilterType === FILTER_BY_CATEGORIES) {
        const tasks = allTasks.filter((task) =>
          category.some((cat) => cat.value === task.category_id),
        );

        setFilteredTasks(tasks);
      }
    }

    return [];
  }

  function handleTaskSearch() {
    filterTasksByLogic();
  }

  function TaskInfo_({ pperiod, taskNo, taskPoints }) {
    if (selectedFilterType === FILTER_BY_CATEGORIES) {
      return (
        <div className={styles.taskMetaContainer}>
          <p>
            <span>Időszak:</span>
            <span>{pperiod}</span>
          </p>
          <p>
            <span>Feladat sorszáma:</span>
            <span>{taskNo}</span>
            <p>
              <p>Pontszám:</p>
              <p>{taskPoints}</p>
            </p>
          </p>
        </div>
      );
    }
    return (
      <div className={styles.taskMetaContainer}>
        <p>hello</p>
      </div>
    );
  }
  return (
    <div className={styles.tasksRootContainer}>
      <h1>Feladatok</h1>
      <div className={styles.filterTypeSelectorContainer}>
        {filterTypes.map(({ label, filterType }) => (
          <Button
            key={filterType}
            containerClassName={styles.buttonContainer}
            className={classnames(
              styles.filterTypeSelector,
              filterType === selectedFilterType
                ? styles.selected
                : styles.notSelected,
            )}
            label={label}
            onClickHandler={() => changeFilterType(filterType)}
          />
        ))}
      </div>
      <div className={styles.filterContainer}>
        {selectedFilterType && (
          <>
            {selectedFilterType === FILTER_BY_PERIOD && (
              <div className={styles.filter}>
                <DropDown
                  options={transformPeriodApiRespnse()}
                  labelValue="Válassz időszakot"
                  id="period"
                  setValue={setPeriod}
                  value={period}
                />
              </div>
            )}

            {selectedFilterType === FILTER_BY_CATEGORIES && (
              <div className={styles.filter}>
                <DropDown
                  labelValue="Válassz témakört"
                  id="topic"
                  options={transformCategoriesApiResponse()}
                  setValue={setCategory}
                  loading={false}
                  value={category}
                  isMulti={isAuthenticated}
                />
              </div>
            )}
            <Button
              disabled={
                (selectedFilterType === FILTER_BY_CATEGORIES && !category) ||
                (selectedFilterType === FILTER_BY_PERIOD && !period)
              }
              label="Keresés"
              onClickHandler={() => handleTaskSearch()}
              containerClassName={styles.searchBtnContainer}
            />
          </>
        )}
      </div>

      <div className={styles.taskContainer}>
        {Array.isArray(filteredTasks) &&
          filteredTasks.length > 0 &&
          filteredTasks.map((task) => (
            <Task
              task={task}
              key={task.id}
              showAdminButtons={false}
              TaskInfo={<p>hello</p>}
            />
          ))}
      </div>
    </div>
  );
}

export default Tasks;
