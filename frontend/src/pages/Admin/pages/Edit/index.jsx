import { useParams } from "react-router-dom";

import useApi from "../../../../hooks/useAPI";
import apiEndpoints from "../../../../api/apiEndpoints";
import NewTask from "../../components/NewTask";

function EditPage() {
  const { taskId } = useParams();
  const { loading, apiReponse } = useApi({
    pathName: `${apiEndpoints.getTaskById}/${taskId}`,
    method: "GET",
  });

  return apiReponse && !loading ? (
    <div>
      <NewTask
        taskImageId={apiReponse.task_image_id}
        taskImagePath={`https://erettsegi-prod.s3.amazonaws.com/${apiReponse.filePath}.png`}
        category={{
          value: apiReponse.category_id,
          label: apiReponse.categoryName,
        }}
        period={{
          value: apiReponse.period_id,
          label: apiReponse.periodName,
        }}
        taskPoint={apiReponse.task_point_no}
        taskNo={apiReponse.task_no}
        taskId={apiReponse.id}
        isModify
      />
    </div>
  ) : (
    <p>loading</p>
  );
}

export default EditPage;
