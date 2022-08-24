/* eslint-disable new-cap */
/* eslint-disable react/no-unstable-nested-components */
import { useState } from "react";
import classnames from "classnames";
import { flatten, sortBy } from "lodash";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import { apiEndpoints } from "../../api";
import Button from "../../components/common/Button";
import DropDown from "../../components/common/Dropdown";

import { useAuth } from "../../context/AuthContext/AuthProvider";
import useApi from "../../hooks/useAPI";
import styles from "./Tasks.module.scss";
import Task from "../../components/common/Task";
import createRandomExam from "../../utils/generateExam";
import { getPeriodTimeStamp } from "../../utils/periods";
import Loader from "../../components/common/Loader";

function Tasks() {
  const { isAuthenticated } = useAuth();
  const [category, setCategory] = useState([null]);
  const [period, setPeriod] = useState(null);
  const [selectedFilterType, setFilterType] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState(null);
  const [isSaving, toggleSaving] = useState(false);

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
    setCategory([]);
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

  function printToPdf() {
    toggleSaving(true);
    html2canvas(document.getElementById("task-container"), {
      onclone: (clonedDoc) => {
        clonedDoc.getElementById("meta-helper").style.display = "block";
        console.debug("kepek", clonedDoc.querySelectorAll(".point-image"));
        Array.from(clonedDoc.querySelectorAll(".point-image")).map((image) => {
          image.style.display = "flex";
        });

        Array.from(clonedDoc.querySelectorAll(".task-no")).map((taskNo) => {
          taskNo.style.display = "block";
        });
      },
    }).then((canvas) => {
      // creaing the PDF itself here
      const pdf = new jsPDF({
        orientation: "p",
        unit: "pt",
        format: [canvas.width, canvas.height],
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
      toggleSaving(false);
    });
  }

  function TaskInfo({ pperiod, taskNo, taskPoints, ccategory, taskNumber }) {
    if (selectedFilterType === FILTER_BY_CATEGORIES) {
      return (
        <div className={styles.taskMetaContainer}>
          <div className={classnames(["task-no", styles.taskNo])}>
            <p>{taskNumber}</p>
          </div>
          <div data-html2canvas-ignore>
            <p>
              <span>Időszak:</span>
              <span>{pperiod}</span>
            </p>
            <p>
              <p id="task-no-info">
                <span>Feladat sorszáma:</span>
                <span>{taskNo}</span>
              </p>
              <p>
                <span>Pontszám:</span>
                <span>{taskPoints}</span>
              </p>
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.taskMetaContainer}>
        <div className={classnames(["task-no", styles.taskNo])}>
          <p>{taskNumber}</p>
        </div>
        <div data-html2canvas-ignore>
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
                  options={transformPeriodApiResponse()}
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
                  setValue={(value) => setCategory(flatten(value))}
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
                  {filteredTasks &&
                    Array.isArray(filteredTasks) &&
                    filteredTasks.length > 0 && (
                      <Button
                        label="Nyomtatás PDF-be"
                        onClickHandler={() => printToPdf()}
                      />
                    )}
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

      <div id="task-container" className={styles.taskContainer}>
        {Array.isArray(filteredTasks) && (
          <div
            data-html2canvas-ignore
            id="task-searchresult"
            className={styles.searchResult}
          >
            <p>
              <span>
                Találatok: {getFilterTypeLabel(selectedFilterType).label}
              </span>
              <span>
                Összesen:
                {filteredTasks.length} feladat
              </span>
              <span>
                Összontszám: {sumTaskPoints(filteredTasks).task_point_no}
              </span>
            </p>
          </div>
        )}
        {Array.isArray(filteredTasks) && (
          <div
            id="meta-helper"
            className={classnames([styles.searchResultHelper])}
          >
            <p>
              <span>
                <span className={styles.bold}>Összesen:</span>
                {filteredTasks.length} feladat
              </span>
              <span>
                <span className={styles.bold}>Választott kategóriák:</span>
                {category.map(({ label }) => label).join(", ")}
              </span>
              <span>
                <span className={styles.bold}>Összontszám:</span>{" "}
                {sumTaskPoints(filteredTasks).task_point_no} pont
              </span>
            </p>
          </div>
        )}
        {Array.isArray(filteredTasks) &&
          filteredTasks.length > 0 &&
          filteredTasks.map((task, index) => (
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
                  taskNumber={index + 1}
                />
              )}
            />
          ))}
      </div>
      <Loader isPortal isLoading={false} />
    </div>
  );
}

export default Tasks;
