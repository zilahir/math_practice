import { useState, useContext } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { flatten, sortBy, shuffle, difference } from "lodash";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { format } from "date-fns";

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
import Input from "../../components/common/Input";
import { SizeContext } from "../../context/SizeContext";

const FILTER_BY_PERIOD = "FILTER_BY_PERIOD";
const FILTER_BY_CATEGORIES = "FILTER_BY_CATEGORIES";
const GENERATE = "GENERATE";
const COMPLEX = "COMPLEX";
const MAX_POINTS = 30;

function sumUntil(array, threshold) {
  let i;
  let result = 0;

  // we loop til the end of the array
  // or right before result > threshold
  for (i = 0; i < array.length && result + array[i] <= threshold; i += 1) {
    result += array[i];
  }

  return {
    index: i - 1, // -1 because it is incremented at the end of the last loop
    result,
  };
}

function TaskInfo({
  pperiod,
  taskNo,
  taskPoints,
  ccategory,
  taskNumber,
  selectedFilterType,
}) {
  if (selectedFilterType === FILTER_BY_CATEGORIES) {
    return (
      <div className={styles.taskMetaContainer}>
        <div className={classnames(["task-no", styles.taskNo])}>
          <p>{`${taskNumber}.`}</p>
        </div>
        <div className={styles.taskMetaInnerContainer} data-html2canvas-ignore>
          <div className={styles.col}>
            <p>
              <span>Időszak:</span>
              <span>{pperiod}</span>
            </p>
            <p>
              <span>Témakör:</span>
              <span>{ccategory}</span>
            </p>
          </div>
          <div className={styles.col}>
            <p id="task-no-info">
              <span>Feladat sorszáma:</span>
              <span>{`${taskNo}.`}</span>
            </p>
            <p>
              <span>Pontszám:</span>
              <span>{taskPoints}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.taskMetaContainer}>
      <div className={classnames(["task-no", styles.taskNo])}>
        <p>{`${taskNumber}.`}</p>
      </div>
      <div data-html2canvas-ignore>
        {selectedFilterType !== COMPLEX ? (
          <p>
            <span>Kategória: </span>
            <span>{ccategory}</span>
          </p>
        ) : (
          <p>
            <span>Időszak:</span>
            <span>{pperiod}</span>
          </p>
        )}
        <p>
          <span>Feladat sorszáma:</span>
          <span>{`${taskNo}.`}</span>
        </p>
        <p>
          <span>Pontszám:</span>
          <span>{taskPoints}</span>
        </p>
      </div>
    </div>
  );
}

TaskInfo.propTypes = {
  pperiod: PropTypes.string.isRequired,
  taskNo: PropTypes.number.isRequired,
  taskPoints: PropTypes.number.isRequired,
  ccategory: PropTypes.string.isRequired,
  taskNumber: PropTypes.number.isRequired,
  selectedFilterType: PropTypes.string.isRequired,
};

function Tasks() {
  const { isAuthenticated } = useAuth();
  const [category, setCategory] = useState([null]);
  const [period, setPeriod] = useState(null);
  const [selectedFilterType, setFilterType] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState(null);
  const [isSaving, toggleSaving] = useState(false);
  const [taskNo, setTaxNo] = useState("");

  const filterTypes = [
    { label: "Időszak alapján", filterType: FILTER_BY_PERIOD },
    { label: "Témakör alapján", filterType: FILTER_BY_CATEGORIES },
    { label: "Feladatsor generálás", filterType: GENERATE },
    { label: "Összetett feladatok", filterType: COMPLEX },
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
      return categories
        .map((currentCat) => ({
          label: currentCat.name,
          value: currentCat.id,
        }))
        .filter(({ value }) => value !== 17);
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

  const pageHeight = selectedFilterType !== COMPLEX ? 280 : 400;
  const { sizes, refs } = useContext(SizeContext);

  function recursiveHandler(sizesArray, elementsArray, canvasArray) {
    return new Promise((resolveMain) => {
      if (Array.isArray(sizesArray) && sizesArray.length > 0) {
        const currentNeeded = sumUntil(sizesArray, pageHeight);

        if (currentNeeded.index !== -1) {
          let remainingSizes = [];
          let remainingElements = [];

          const theseElements = elementsArray.slice(0, currentNeeded.index + 1);

          theseElements.map((item) =>
            document.getElementById("copy").append(item.cloneNode(true)),
          );

          const promise = new Promise((resolve) => {
            html2canvas(document.getElementById("copy"), {
              useCORS: true,
              logging: false,
              onclone: (clonedDoc) => {
                clonedDoc.getElementById("meta-helper").style.display = "block";
                Array.from(clonedDoc.querySelectorAll(".point-image")).map(
                  (image) => {
                    image.style.display = "flex";
                    return true;
                  },
                );

                Array.from(clonedDoc.querySelectorAll(".task-no")).map(
                  (thisTask) => {
                    thisTask.style.display = "block";
                    return true;
                  },
                );
              },
            }).then((canvas) => {
              // canvas is ready we need to clean up for the next iteration
              document.getElementById("copy").innerHTML = "";
              // remaining items az mindig az a shallow-copy of tasks amikbol canvas-t kell csinlani
              remainingSizes = difference(
                sizesArray,
                sizesArray.slice(0, currentNeeded.index + 1),
              );

              remainingElements = difference(
                elementsArray,
                elementsArray.slice(0, currentNeeded.index + 1),
              );

              canvasArray.push({
                canvas,
                currentNeeded,
              });
              resolve(canvas);
            });
          });

          promise.then(() =>
            resolveMain(
              recursiveHandler(remainingSizes, remainingElements, canvasArray),
            ),
          );
        } else {
          // mit csinaljunk ha nem fer ra egy oldalra
        }
      } else {
        resolveMain(canvasArray);
      }
    });
  }

  function printToPdf() {
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
    });

    document.getElementById("copy").innerHTML = "";
    const sizesInMm = sizes.map((thisSize) => thisSize * Number(0.2645833333));
    toggleSaving(true);
    const canvases = [];
    recursiveHandler(sizesInMm, refs, canvases).then((createdCanvases) => {
      if (Array.isArray(canvases)) {
        createdCanvases.map(({ canvas }, index) => {
          const imgData = canvas.toDataURL("image/jpeg", 1.0);
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
          if (index < canvases.length - 1) {
            return pdf.addPage();
          }
          return true;
        });

        const fileName = format(new Date(), "yyyy-MM-dd_hh:mm");
        pdf.save(`erettsegi_${fileName}`);
      }
    });
    toggleSaving(false);
  }

  function getRandomComplexTasks() {
    const complexTasks = allTasks.filter(
      ({ category_id }) => category_id === 17,
    );

    const randomCompleyTasks = shuffle(complexTasks).slice(0, taskNo);
    setFilteredTasks(randomCompleyTasks);
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
                  isMulti={false}
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
                        disabled={isSaving || !isAuthenticated}
                        label={
                          !isSaving
                            ? "Nyomtatás PDF-be"
                            : "PDF Nyomtatás folyamatban"
                        }
                        onClickHandler={() => printToPdf()}
                      />
                    )}
                </div>
              </div>
            )}
            {selectedFilterType === COMPLEX && (
              <div className={styles.complexTaskRootContainer}>
                <div className={styles.taskNoInputContainer}>
                  <Input
                    inputType="number"
                    value={taskNo}
                    placeHolder="Feladatok száma"
                    htmlFor="task-no"
                    onChangeHandler={(value) => setTaxNo(value)}
                    className={styles.taskNoInput}
                  />
                </div>
                <div>
                  <Button
                    onClickHandler={() => getRandomComplexTasks()}
                    label="Generálás"
                    disabled={!taskNo || taskNo < 1}
                  />
                  <div className={styles.printToPdfButtonContainer}>
                    {filteredTasks &&
                      Array.isArray(filteredTasks) &&
                      filteredTasks.length > 0 && (
                        <Button
                          label="Nyomtatás PDF-be"
                          disabled={!isAuthenticated}
                          onClickHandler={() => printToPdf()}
                        />
                      )}
                  </div>
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
                {`Találatok: ${getFilterTypeLabel(selectedFilterType).label}`}
              </span>
              <span>{`összesen: ${filteredTasks.length} feladat`}</span>
              <span>
                {`Összpontszám: ${sumTaskPoints(filteredTasks).task_point_no}`}
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
                {`${filteredTasks.length} feladat`}
              </span>
              {selectedFilterType !== COMPLEX && (
                <span>
                  <span className={styles.bold}>Választott kategóriák:</span>
                  {category.map(({ label }) => label).join(", ")}
                </span>
              )}
              <span>
                <span className={styles.bold}>Összontszám:</span>
                {`${sumTaskPoints(filteredTasks).task_point_no} pont`}
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
              renderTaskInfo={() => (
                <TaskInfo
                  pperiod={task.periodName}
                  taskNo={task.task_no}
                  taskPoints={task.task_point_no}
                  ccategory={task.categoryName}
                  taskNumber={index + 1}
                  selectedFilterType={selectedFilterType}
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
