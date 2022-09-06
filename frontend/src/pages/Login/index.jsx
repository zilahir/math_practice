import { useState } from "react";
import classnames from "classnames";
import { useNavigate, useLocation } from "react-router-dom";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import styles from "./Login.module.scss";
import SuccessNotification from "../../components/common/components/SuccessNotification";
import useApi from "../../hooks/useAPI";
import { apiEndpoints } from "../../api";
import { useAuth } from "../../context/AuthContext/AuthProvider";
import Error from "../../components/common/Error";

function Login() {
  const { state } = useLocation();
  const { error, apiRequestHandler } = useApi({
    pathName: apiEndpoints.login,
    method: "POST",
  });
  const [username, setUsername] = useState(
    process.env.NODE_ENV === "development" ? "zilahi@gmail.com" : "",
  );
  const [password, setPassword] = useState(
    process.env.NODE_ENV === "development" ? "DemoPassword123" : "",
  );

  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleLogin() {
    if (username.length !== 0 && password.length !== 0) {
      const loginObject = {
        email: username,
        password,
      };

      // call login API
      apiRequestHandler(loginObject).then((apiResponse) => {
        signIn(apiResponse.user, () => navigate("/tasks"));
      });
    }
  }
  return (
    <div className={styles.loginContainer}>
      {state && Object.hasOwn(state, "newReg") && (
        <SuccessNotification
          successMessages={["Sikeres regisztráció!", "A folytatáshoz lépj be"]}
        />
      )}

      {error &&
        Array.isArray(error.errors) &&
        error.errors.map((err) => <Error errorText={err.msg} />)}
      <div className={styles.innerContainer}>
        <Input
          className={classnames(styles.loginInput, styles.textBox)}
          placeHolder="Felhasználói név"
          value={username}
          onChangeHandler={setUsername}
          htmlFor="email"
        />
        <Input
          className={classnames(styles.loginInput, styles.textBox)}
          inputType="password"
          placeHolder="Jelszó"
          value={password}
          onChangeHandler={setPassword}
          htmlFor="password"
        />
        <Button
          label="Bejelentkezés"
          onClickHandler={() => handleLogin()}
          className={styles.loginInput}
        />
      </div>
    </div>
  );
}

export default Login;
