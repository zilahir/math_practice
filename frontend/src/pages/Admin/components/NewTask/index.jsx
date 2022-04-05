/* eslint-disable react/jsx-no-constructed-context-values */
import { useState } from "react";
import DropDown from "../../../../components/common/Dropdown";

import ImageUpload from "../ImageUpload";
import NewTaskContext from "./Context";

function NewTask() {
  const [taskImagePath, setTaskImagePath] = useState();
  const [topicId, setTopicId] = useState();
  const [periodId, setPeriodId] = useState();
  const [taskPoint, setTaskPoint] = useState();
  // const [taskTitle, setTaskTitle] = useState();

  const periodOptions = [
    { label: "2021 Május", value: 1 },
    { label: "2023 Május", value: 2 },
  ];

  return (
    <NewTaskContext.Provider
      value={{
        taskImagePath,
        setTaskImagePath,
        topicId,
        setTopicId,
        periodId,
        setPeriodId,
        taskPoint,
        setTaskPoint,
      }}
    >
      <div>
        <ImageUpload setTaskImagePath={setTaskImagePath} />
        <DropDown
          labelValue="Vállasz időszakot"
          id="period"
          options={periodOptions}
          setValue={setPeriodId}
          loading={false}
        />
      </div>
    </NewTaskContext.Provider>
  );
}

export default NewTask;
