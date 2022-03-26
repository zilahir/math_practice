import { useState } from "react";
import classnames from "classnames";

import Input from "../../components/common/Input";
import styles from "../Login/Login.module.scss";
import Button from "../../components/common/Button";
// import api from "../../api";
import useApi from "../../hooks/useAPI";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, apiResponse, apiRequestHandler } = useApi({
    pathName: "/user",
  });

  async function handleRegistration() {
    await apiRequestHandler({
      email,
      password,
    });
    /* api.post("/user", {
      email,
      password,
    }).then(() => {
      console.log("READY!!!");
    }); */
  }

  console.log('loading', loading);

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
