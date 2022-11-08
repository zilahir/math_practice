import { useState } from "react";
import PropTypes from "prop-types";
import { sortBy } from "lodash";

import DropDown from "../../../../components/common/Dropdown";
import useApi from "../../../../hooks/useAPI";
import ImageUpload from "../ImageUpload";
import Button from "../../../../components/common/Button";
import Input from "../../../../components/common/Input";
import { apiEndpoints } from "../../../../api";
import styles from "./NewTask.module.scss";
import SuccessNotification from "../../../../components/common/components/SuccessNotification";
import { newTaskSchema } from "../../../../api/schemas";
import Error from "../../../../components/common/Error";
import { getPeriodTimeStamp } from "../../../../utils/periods";

function NewTask({
  taskImageId: iTaskImageId = null,
  category: iCategory = null,
  period: iPeriod = null,
  taskPoint: iTaskPoint = undefined,
  taskNo: iTaskNo = undefined,
  isModify = false,
  taskId = null,
  taskImagePath = null,
}) {
  const [taskImageId, setTaskImageId] = useState(iTaskImageId);
  const [error, setError] = useState();
  const [isSuccess, setSuccess] = useState(false);
  const [category, setCategory] = useState(iCategory);
  const [period, setPeriod] = useState(iPeriod);
  const [deletePreview, setDeletePreview] = useState(false);
  const [taskPoint, setTaskPoint] = useState(iTaskPoint);
  const [taskNo, setTaskNo] = useState(iTaskNo);
  const [updateSuccessFulMessage, setUpdateSucessfulMessage] =
    useState(undefined);
  const { apiReponse: periodsApiResponse, loading } = useApi({
    method: "GET",
    pathName: apiEndpoints.periods,
  });

  const { apiRequestHandler: modifyApiRequestHandler } = useApi({
    method: "PATCH",
    pathName: apiEndpoints.modifyTask,
  });

  const { apiReponse: categoriesApiResponse } = useApi({
    method: "GET",
    pathName: apiEndpoints.categories,
  });

  const { apiRequestHandler } = useApi({
    method: "POST",
    pathName: apiEndpoints.newTask,
  });

  function transformPeriodApiResponse() {
    if (periodsApiResponse && Array.isArray(periodsApiResponse)) {
      const resp = periodsApiResponse.map((currentPeriod) => ({
        label: currentPeriod.periodName,
        value: currentPeriod.id,
        periodTimestamp: getPeriodTimeStamp(currentPeriod.periodName),
      }));
      return sortBy(resp, ["periodTimestamp"]);
    }

    return [];
  }

  function transformCategoriesApiResponse() {
    if (categoriesApiResponse && Array.isArray(categoriesApiResponse)) {
      return categoriesApiResponse.map((currentCat) => ({
        label: currentCat.name,
        value: currentCat.id,
      }));
    }

    return [];
  }

  function handleTask() {
    setError(undefined);
    setSuccess(false);
    const newTaskObject = {
      taskImageId,
      categoryId: category ? category.value : undefined,
      periodId: period ? period.value : undefined,
      taskPoints: Number(taskPoint),
      taskNo: Number(taskNo),
    };

    const isValid = newTaskSchema.validate(newTaskObject);

    if (!isModify) {
      if (Object.hasOwn(isValid, "error")) {
        setError("Hiányos adatok");
      } else {
        apiRequestHandler(newTaskObject).then(() => {
          setDeletePreview(true);
          setTaskImageId();
          setCategory(null);
          setPeriod(null);
          setTaskPoint("");
          setTaskNo("");
          setSuccess(true);
        });
      }
    } else {
      setUpdateSucessfulMessage(undefined);
      const modifyObject = { ...newTaskObject, taskId };
      modifyApiRequestHandler(modifyObject).then(() => {
        setUpdateSucessfulMessage("Módosítás sikeres!");
      });
    }
  }

  return (
    <div className={styles.newTaskRootContainer}>
      {isSuccess && (
        <SuccessNotification
          successMessages={["A feladat létrehozása sikeres!"]}
        />
      )}

      {error && <Error errorText={error} />}
      {updateSuccessFulMessage && (
        <SuccessNotification successMessages={[updateSuccessFulMessage]} />
      )}
      <ImageUpload
        deletePreview={deletePreview}
        setTaskImagePath={setTaskImageId}
        isPreviewImageUrl={taskImagePath}
      />
      <DropDown
        labelValue="Válassz időszakot"
        id="period"
        options={transformPeriodApiResponse()}
        setValue={setPeriod}
        value={period}
        loading={loading}
        isMulti={false}
      />
      <DropDown
        labelValue="Válassz témakört"
        id="topic"
        options={transformCategoriesApiResponse()}
        setValue={setCategory}
        loading={false}
        value={category}
        isMulti={false}
      />
      <Input
        htmlFor="point"
        value={taskPoint}
        onChangeHandler={setTaskPoint}
        placeholder="Pontszám"
        inputLabel="Pontszám"
        inputType="number"
        className={styles.input}
      />
      <Input
        htmlFor="taskNo"
        value={taskNo}
        onChangeHandler={setTaskNo}
        placeholder="Feladat sorszáma"
        inputLabel="Feladat sorszáma"
        inputType="number"
        className={styles.input}
      />
      <Button label="Mentés" onClickHandler={() => handleTask()} />
    </div>
  );
}

NewTask.defaultProps = {
  taskImageId: null,
  category: null,
  period: null,
  taskPoint: undefined,
  taskNo: undefined,
  isModify: false,
  taskId: null,
  taskImagePath: null,
};

NewTask.propTypes = {
  taskImagePath: PropTypes.string,
  taskImageId: PropTypes.number,
  category: PropTypes.string,
  period: PropTypes.number,
  taskPoint: PropTypes.number,
  taskNo: PropTypes.number,
  isModify: PropTypes.bool,
  taskId: PropTypes.number,
};

export default NewTask;
