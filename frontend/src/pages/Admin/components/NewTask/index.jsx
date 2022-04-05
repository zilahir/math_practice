/* eslint-disable react/jsx-no-constructed-context-values */
import { useState } from "react";
import DropDown from "../../../../components/common/Dropdown";

import ImageUpload from "../ImageUpload";
import NewTaskContext from "./Context";
import Button from "../../../../components/common/Button";

function NewTask() {
  const [taskImagePath, setTaskImagePath] = useState();
  const [topic, setTopic] = useState();
  const [period, setPeriod] = useState();
  const [taskPoint, setTaskPoint] = useState();
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
        <Button label="Mentés" onClickHandler={() => handleNewTaskSave()} />
      </div>
    </NewTaskContext.Provider>
  );
}

export default NewTask;
