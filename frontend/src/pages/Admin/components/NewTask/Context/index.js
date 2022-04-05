import { createContext } from "react";

const newTaskContext = createContext({
  taskImagePath: undefined,
  setTaskImagePath: () => {},
  topicId: undefined,
  setTopicId: () => {},
  periodId: undefined,
  setPeriodId: () => {},
  taskPoint: undefined,
  setTaskPoint: () => {},
  taskTitle: undefined,
  setTaskTitle: () => {},
});

export default newTaskContext;
