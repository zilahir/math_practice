import { useState } from "react";
import { apiEndpoints } from "../../../../api";
import SuccessNotification from "../../../../components/common/components/SuccessNotification";
import Task from "../../../../components/common/Task";
import useApi from "../../../../hooks/useAPI";

function AllTask() {
  const [isDeleted, setIsDeleted] = useState(false);
  const { apiReponse } = useApi({
    method: "GET",
    pathName: apiEndpoints.allTask,
  });

  const { apiRequestHandler } = useApi({
    method: "POST",
    pathName: apiEndpoints.deleteTask,
  });

  function handleTaskDelete(taskId) {
    apiRequestHandler({
      taskId,
    }).then(() => {
      setIsDeleted(true);
      setTimeout(() => {
        setIsDeleted(false);
      }, 3000);
    });
  }
  return (
    <div>
      {isDeleted && (
        <SuccessNotification
          successMessages={["A feladat sikeresen törölve!"]}
        />
      )}
      {apiReponse && Array.isArray(apiReponse) && apiReponse.length > 0 ? (
        apiReponse.map((task) => (
          <Task
            handleTaskDelete={() => handleTaskDelete(task.id)}
            task={task}
            key={task.id}
          />
        ))
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

export default AllTask;
