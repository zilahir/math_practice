import { useState } from "react";
import classnames from "classnames";

import Input from "../../components/common/Input";
import styles from "../Login/Login.module.scss";
import Button from "../../components/common/Button";
import useApi from "../../hooks/useAPI";
import { apiEndpoints } from "../../api";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, apiResponse, apiRequestHandler } = useApi({
    pathName: apiEndpoints.signUp,
    method: "POST",
  });

  async function handleRegistration() {
    await apiRequestHandler({
      email,
      password,
    });
  }

  return (
    <div className={styles.loginContainer}>
      <Input
        className={classnames(styles.loginInput, styles.textBox)}
        inputType="text"
        placeHolder="Email cím"
        value={email}
        onChangeHandler={setEmail}
      />
      <Input
        className={classnames(styles.loginInput, styles.textBox)}
        inputType="password"
        placeHolder="Jelszó"
        value={password}
        onChangeHandler={setPassword}
      />
      <Button
        label="Regisztrálok"
        onClickHandler={() => handleRegistration()}
        className={styles.loginInput}
      />
    </div>
  );
}

export default SignUp;
