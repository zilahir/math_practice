/* eslint-disable react/no-unstable-nested-components */
import { useState } from "react";
import classnames from "classnames";

import { apiEndpoints } from "../../api";
import Button from "../../components/common/Button";
import DropDown from "../../components/common/Dropdown";

import { useAuth } from "../../context/AuthContext/AuthProvider";
import useApi from "../../hooks/useAPI";
import styles from "./Tasks.module.scss";
import Task from "../../components/common/Task";
import createRandomExam from "../../utils/generateExam";

function Tasks() {
  const { isAuthenticated } = useAuth();
  const [category, setCategory] = useState(null);
  const [period, setPeriod] = useState(null);
  const [selectedFilterType, setFilterType] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState(null);

  const FILTER_BY_PERIOD = "FILTER_BY_PERIOD";
  const FILTER_BY_CATEGORIES = "FILTER_BY_CATEGORIES";
  const GENERATE = "GENERATE";
  const MAX_POINTS = 30;

  const filterTypes = [
    { label: "Időszak alapján", filterType: FILTER_BY_PERIOD },
    { label: "Témakör alapján", filterType: FILTER_BY_CATEGORIES },
    { label: "Feladatsor generálás", filterType: GENERATE },
  ];

  const getFilterTypeLabel = (filterType) =>
    filterTypes.find((types) => types.filterType === filterType);

  function changeFilterType(chosenFilterType) {
    setCategory(null);
    setPeriod(null);
    setFilteredTasks(null);
    setFilterType(chosenFilterType);
  }

  function sumTaskPoints(taskList) {
    return taskList.reduce(
      (a, b) => ({
        task_point_no: a.task_point_no + b.task_point_no,
      }),
      {
        task_point_no: 0,
      },
    );
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

  function generateExam() {
    const tasks = allTasks
      .filter((task) => category.some((cat) => cat.value === task.category_id))
      .map((task) => ({
        ...task,
        w: task.task_point_no,
        b: task.task_point_no,
      }));

    const generated = createRandomExam(tasks, MAX_POINTS);

    if (Array.isArray(generated.set) && generated.set.length > 0) {
      setFilteredTasks(generated.set);
    }
  }

  function TaskInfo({ pperiod, taskNo, taskPoints, ccategory }) {
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
              <span>Pontszám:</span>
              <span>{taskPoints}</span>
            </p>
          </p>
        </div>
      );
    }
    return (
      <div className={styles.taskMetaContainer}>
        <p>
          <span>Kategória: </span>
          <span>{ccategory}</span>
        </p>
        <p>
          <span>Feladat sorszáma:</span>
          <span>{taskNo}</span>
          <p>
            <span>Pontszám:</span>
            <span>{taskPoints}</span>
          </p>
        </p>
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

            {selectedFilterType === GENERATE && (
              <div>
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
                  <Button
                    label="Generálás"
                    containerClassName={styles.searchBtnContainer}
                    onClickHandler={() => generateExam()}
                    disabled={!category || !Array.isArray(category)}
                  />
                </div>
              </div>
            )}
            {(selectedFilterType === FILTER_BY_CATEGORIES ||
              selectedFilterType === FILTER_BY_PERIOD) && (
              <Button
                disabled={
                  (selectedFilterType === FILTER_BY_CATEGORIES && !category) ||
                  (selectedFilterType === FILTER_BY_PERIOD && !period)
                }
                label="Keresés"
                onClickHandler={() => handleTaskSearch()}
                containerClassName={styles.searchBtnContainer}
              />
            )}
          </>
        )}
      </div>

      <div className={styles.taskContainer}>
        {Array.isArray(filteredTasks) && (
          <div className={styles.searchResult}>
            <p>
              <span>
                Találatok: {getFilterTypeLabel(selectedFilterType).label}
              </span>
              <span>Összesen: {filteredTasks.length} feladat</span>
              <span>
                Összontszám: {sumTaskPoints(filteredTasks).task_point_no}
              </span>
            </p>
          </div>
        )}
        {Array.isArray(filteredTasks) &&
          filteredTasks.length > 0 &&
          filteredTasks.map((task) => (
            <Task
              task={task}
              key={task.id}
              showAdminButtons={false}
              TaskInfo={() => (
                <TaskInfo
                  pperiod={task.periodName}
                  taskNo={task.task_no}
                  taskPoints={task.task_point_no}
                  ccategory={task.categoryName}
                />
              )}
            />
          ))}
      </div>
    </div>
  );
}

export default Tasks;
