/* eslint-disable react/jsx-no-constructed-context-values */
import { useState } from "react";
import DropDown from "../../../../components/common/Dropdown";

import ImageUpload from "../ImageUpload";
import NewTaskContext from "./Context";
import Button from "../../../../components/common/Button";
import Input from "../../../../components/common/Input";

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
  // const [taskTitle, setTaskTitle] = useState();

  const periodOptions = [
    { label: "2021 Május", value: 1 },
    { label: "2023 Május", value: 2 },
  ];

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
          options={periodOptions}
          setValue={setPeriod}
          loading={false}
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
