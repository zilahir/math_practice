import { useRef, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";

// import { apiEndpoints, API_ROOT_URL } from "../../../api";
import Button from "../Button";
import styles from "./Task.module.scss";
import pointNo2 from "../../../assets/points/2pont.png";
import pointNo3 from "../../../assets/points/3pont.png";
import pointNo4 from "../../../assets/points/4pont.png";
import { SizeContext } from "../../../context/SizeContext";

const taskPointImages = {
  2: pointNo2,
  3: pointNo3,
  4: pointNo4,
};

function Task({ task, handleTaskDelete, showAdminButtons, renderTaskInfo }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();

  const ref = useRef(null);

  const { setSizes, setRefs } = useContext(SizeContext);

  useEffect(() => {
    let timeout = null;
    if (ref && ref.current) {
      timeout = setTimeout(() => {
        const size = ref.current.getBoundingClientRect().height;
        setSizes((values) => [...values, size]);
        setRefs((values) => [...values, ref.current]);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, []);

  function handleDelete() {
    setIsDeleted(true);
    handleTaskDelete(task.id);
  }

  function filePathUrl() {
    if (process.env.NODE_ENV === "production") {
      return `https://erettsegi-prod.s3.amazonaws.com/${task.filePath}.png`;
    }

    return `https://erettsegi-prod.s3.amazonaws.com/${task.filePath}.png`;
    // return `${API_ROOT_URL}${apiEndpoints.static}/${task.filePath}`;
  }

  return (
    <div
      className={classnames(
        styles.singleTaskRootContainer,
        isDeleted && styles.deleted,
      )}
      ref={ref}
    >
      <div
        className={classnames(
          styles.innerContainer,
          !showAdminButtons && styles.taskPage,
        )}
      >
        {showAdminButtons ? (
          <div className={styles.metaContainer}>
            <p>{`Témakör: ${task.categoryName}`}</p>
            <p>{`Érettségi időszak: ${task.periodName}`}</p>
            <p>{`Feladat sorszáma: ${task.task_no}.`}</p>
            <p>{`Feladat pontszáma: ${task.task_point_no}`}</p>
          </div>
        ) : (
          renderTaskInfo()
        )}

        <div className={styles.imageContainer}>
          <img crossOrigin="anonymous" src={filePathUrl()} alt="feladat" />
          <div id="outer">
            <div id="inner-1" />
            <div
              className={classnames([
                "point-image",
                styles.taskPointImageContainer,
              ])}
            >
              <img
                crossOrigin="anonymous"
                alt="pont"
                src={taskPointImages[task.task_point_no]}
              />
            </div>
          </div>
        </div>
      </div>
      {showAdminButtons && (
        <div className={styles.buttonContainer}>
          <Button
            onClickHandler={() => navigate(`/admin/task/${task.id}`)}
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
      )}
    </div>
  );
}

Task.defaultProps = {
  handleTaskDelete: null,
  showAdminButtons: true,
  renderTaskInfo: undefined,
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category_id: PropTypes.number.isRequired,
    task_point_no: PropTypes.number.isRequired,
    filePath: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    periodName: PropTypes.string.isRequired,
    // eslint-disable-next-line camelcase
    task_no: PropTypes.number.isRequired,
  }).isRequired,
  handleTaskDelete: PropTypes.func,
  showAdminButtons: PropTypes.bool,
  renderTaskInfo: PropTypes.func,
};

export default Task;
