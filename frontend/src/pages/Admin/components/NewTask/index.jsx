/* eslint-disable react/jsx-no-constructed-context-values */
import { useState } from "react";

import ImageUpload from "../ImageUpload";
import NewTaskContext from "./Context";

function NewTask() {
  const [taskImagePath, setTaskImagePath] = useState();
  const [topicId, setTopicId] = useState();
  const [periodId, setPeriodId] = useState();
  const [taskPoint, setTaskPoint] = useState();
  // const [taskTitle, setTaskTitle] = useState();

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
      </div>
    </NewTaskContext.Provider>
  );
}

export default NewTask;
