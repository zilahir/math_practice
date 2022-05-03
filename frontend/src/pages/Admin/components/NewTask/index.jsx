import { useState } from "react";

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

function NewTask() {
  const [taskImageId, setTaskImageId] = useState();
  const [error, setError] = useState();
  const [isSuccess, setSuccess] = useState(false);
  const [category, setCategory] = useState(null);
  const [period, setPeriod] = useState(null);
  const [deletePreview, setDeletePreview] = useState(false);
  const [taskPoint, setTaskPoint] = useState();
  const [taskNo, setTaskNo] = useState();
  const { apiReponse, loading } = useApi({
    method: "GET",
    pathName: apiEndpoints.periods,
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

  const topicOptions = [
    { label: "Kombinatorika", value: 1 },
    { label: "Sorozatok", value: 2 },
  ];

  function handleNewTaskSave() {
    setError(undefined);
    isSuccess(false);
    const newTaskObject = {
      taskImageId,
      categoryId: category ? category.value : undefined,
      periodId: period ? period.value : undefined,
      taskPoints: Number(taskPoint),
      taskNo: Number(taskNo),
    };

    const isValid = newTaskSchema.validate(newTaskObject);

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
      />
      <DropDown
        labelValue="Válassz időszakot"
        id="period"
        options={transformPeriodApiRespnse()}
        setValue={setPeriod}
        loading={loading}
        value={period}
      />
      <DropDown
        labelValue="Válassz témakört"
        id="topic"
        options={topicOptions}
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
      <Button label="Mentés" onClickHandler={() => handleNewTaskSave()} />
    </div>
  );
}

export default NewTask;
