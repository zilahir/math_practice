/* eslint-disable react/jsx-no-constructed-context-values */
import { useState, useEffect } from "react";
import DropDown from "../../../../components/common/Dropdown";
import useApi from "../../../../hooks/useAPI";

import ImageUpload from "../ImageUpload";
import NewTaskContext from "./Context";
import Button from "../../../../components/common/Button";
import Input from "../../../../components/common/Input";
import { apiEndpoints } from "../../../../api";

const DEFAULT_OPTION = {
  value: "",
  label: "",
};

function NewTask() {
  const [taskImagePath, setTaskImagePath] = useState();
  const [topic, setTopic] = useState(DEFAULT_OPTION);
  const [period, setPeriod] = useState(DEFAULT_OPTION);
  const [taskPoint, setTaskPoint] = useState();
  const [taskNo, setTaskNo] = useState();
  const { apiReponse, loading } = useApi({
    method: "GET",
    pathName: apiEndpoints.periods,
  });

  function transformPeriodApiRespnse() {
    if (apiReponse && Array.isArray(apiReponse)) {
      return apiReponse.map((currentPeriod) => ({
        label: currentPeriod.periodName,
        value: currentPeriod.value,
      }));
    }

    return [];
  }

  const topicOptions = [
    { label: "Kombinatorika", value: 1 },
    { label: "Sorozatok", value: 2 },
  ];

  function handleNewTaskSave() {
    // check if everything is filled
    const newTaskObject = {
      taskImagePath,
      topicId: topic.value,
      periodId: period.value,
    };
    console.log("saving!!!", newTaskObject);
  }

  return (
    <NewTaskContext.Provider
      value={{
        taskImagePath,
        setTaskImagePath,
        topic,
        setTopic,
        period,
        setPeriod,
        taskPoint,
        setTaskPoint,
      }}
    >
      <div>
        <ImageUpload setTaskImagePath={setTaskImagePath} />
        <DropDown
          labelValue="Válassz időszakot"
          id="period"
          options={transformPeriodApiRespnse()}
          setValue={setPeriod}
          loading={loading}
        />
        <DropDown
          labelValue="Válassz témakör"
          id="topic"
          options={topicOptions}
          setValue={setTopic}
          loading={false}
        />
        <Input
          value={taskPoint}
          onChangeHandler={setTaskPoint}
          placeholder="Pontszám"
          inputLabel="Pontszám"
          inputType="number"
        />
        <Input
          value={taskNo}
          onChangeHandler={setTaskNo}
          placeholder="Feladat sorszáma"
          inputLabel="Feladat sorszáma"
          inputType="number"
        />
        <Button label="Mentés" onClickHandler={() => handleNewTaskSave()} />
      </div>
    </NewTaskContext.Provider>
  );
}

export default NewTask;
