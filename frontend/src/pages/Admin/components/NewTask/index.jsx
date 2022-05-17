import { useState } from "react";
import PropTypes from "prop-types";

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

function NewTask({
  taskImageId: iTaskImageId = null,
  category: iCategory = null,
  period: iPeriod = null,
  taskPoint: iTaskPoint = null,
  taskNo: iTaskNo = null,
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
  const { apiReponse, loading } = useApi({
    method: "GET",
    pathName: apiEndpoints.periods,
  });

  const {
    apiReponse: modifyApiResponse,
    loading: modifyApiLoading,
    apiRequestHandler: modifyApiRequestHandler,
  } = useApi({
    method: "PATCH",
    pathName: apiEndpoints.modifyTask,
  });

  const { apiReponse: categories } = useApi({
    method: "GET",
    pathName: apiEndpoints.categories,
  });

  const { apiRequestHandler } = useApi({
    method: "POST",
    pathName: apiEndpoints.newTask,
  });

  function transformPeriodApiRespnse() {
    if (apiReponse && Array.isArray(apiReponse)) {
      return apiReponse.map((currentPeriod) => ({
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
      const modifyObject = { ...newTaskObject, taskId };
      modifyApiRequestHandler(modifyObject);
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
      <ImageUpload
        deletePreview={deletePreview}
        setTaskImagePath={setTaskImageId}
        isPreviewImageUrl={taskImagePath}
      />
      <DropDown
        labelValue="Válassz időszakot"
        id="period"
        options={transformPeriodApiRespnse()}
        setValue={setPeriod}
        value={period}
        loading={loading}
      />
      <DropDown
        labelValue="Válassz témakört"
        id="topic"
        options={transformCategoriesApiResponse()}
        setValue={setCategory}
        loading={false}
        value={category}
      />
      <Input
        value={taskPoint}
        onChangeHandler={setTaskPoint}
        placeholder="Pontszám"
        inputLabel="Pontszám"
        inputType="number"
        className={styles.input}
      />
      <Input
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
  taskPoint: null,
  taskNo: null,
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
