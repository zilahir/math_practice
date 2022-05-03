import { useParams } from "react-router-dom";

function Edit() {
  const { taskId } = useParams();
  return <p>itt fogunk módosítani az {taskId} id feladatot</p>;
}

export default Edit;
