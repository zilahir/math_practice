import { useState } from "react";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";

import Input from "../../components/common/Input";
import styles from "../Login/Login.module.scss";
import Button from "../../components/common/Button";
import useApi from "../../hooks/useAPI";
import { apiEndpoints } from "../../api";
import Error from "../../components/common/Error";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { apiRequestHandler } = useApi({
    pathName: apiEndpoints.signUp,
    method: "POST",
  });

  const navigate = useNavigate();

  function handleRegistration() {
    setErrors([]);
    apiRequestHandler({
      email,
      password,
    }).then((response) => {
      if (Object.hasOwn(response, "errors") && Array.isArray(response.errors)) {
        setErrors(response.errors);
      } else {
        // sikeres regisztráció
        navigate("/login", {
          state: {
            newReg: true,
          },
        });
      }
    });
  }

  return (
    <div className={styles.loginContainer}>
      {errors.length > 0 &&
        errors.map((error) => (
          <Error key={error.value} errorText={error.msg} />
        ))}

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
