import { useNavigate } from "react-router-dom";

import Button from "../../../../components/common/Button";
import { adminRoutes } from "../../../../fakeApi/menuItems";

import styles from "./Root.module.scss";

function AdminRootPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.adminRootContainer}>
      <div className={styles.innerButtonContainer}>
        {adminRoutes
          .filter((route) => route.isMenu)
          .map((route) => (
            <Button
              key={route.name}
              label={route.menuLabel}
              onClickHandler={() => navigate(route.path)}
              className={styles.btn}
            />
          ))}
      </div>
    </div>
  );
}

export default AdminRootPage;
