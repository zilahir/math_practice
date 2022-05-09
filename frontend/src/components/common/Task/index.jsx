import { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";

import { apiEndpoints, API_ROOT_URL } from "../../../api";
import { adminRoutes } from "../../../fakeApi/menuItems";
import Button from "../Button";

import styles from "./Task.module.scss";

function Task({ task, handleTaskDelete }) {
  const [isDeleted, setIsDeleted] = useState(false);

  const navigate = useNavigate();

  function handleDelete() {
    setIsDeleted(true);
    handleTaskDelete(task.id);
  }
  return (
    <div
      className={classnames(
        styles.singleTaskRootContainer,
        isDeleted && styles.deleted,
      )}
    >
      <div className={styles.innerContainer}>
        <div className={styles.metaContainer}>
          <p>Témakör: {task.categoryName}</p>
          <p>Érettségi időszak: {task.periodName}</p>
          <p>
            Feladat sorszáma:
            {task.task_no}
          </p>
          <p>Feladat pontszáma: {task.task_point_no}</p>
        </div>

        <div className={styles.imageContainer}>
          <img
            src={`${API_ROOT_URL}${apiEndpoints.static}/${task.filePath}`}
            alt="feadat"
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          onClickHandler={() => navigate(`${adminRoutes.editTask}/${task.id}`)}
          className={styles.button}
          label="Módosítás"
        />
        <Button
          onClickHandler={() => handleDelete()}
          variant="danger"
          className={styles.button}
          label="Törlés"
        />
      </div>
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    task_image_id: PropTypes.number.isRequired,
    category_id: PropTypes.number.isRequired,
    period_id: PropTypes.number.isRequired,
    task_no: PropTypes.number.isRequired,
    task_point_no: PropTypes.number.isRequired,
    filePath: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    periodName: PropTypes.string.isRequired,
  }).isRequired,
  handleTaskDelete: PropTypes.func.isRequired,
};

export default Task;
