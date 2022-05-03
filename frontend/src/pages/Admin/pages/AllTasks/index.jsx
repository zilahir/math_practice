import { apiEndpoints } from "../../../../api";
import Task from "../../../../components/common/Task";
import useApi from "../../../../hooks/useAPI";

function AllTask() {
  const { apiReponse, loading } = useApi({
    method: "GET",
    pathName: apiEndpoints.allTask,
  });

  console.log("alltask", apiReponse);
  return apiReponse && Array.isArray(apiReponse) && apiReponse.length > 0 ? (
    apiReponse.map((task) => <Task task={task} />)
  ) : (
    <p>loading</p>
  );
}

export default AllTask;
