import { useState } from "react";

import Input from "../../components/common/Input";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    const loginObject = {
      username,
      password,
    };
    console.log("loginObject", loginObject);
  }
  return (
    <div>
      <Input placeHolder="Felhasználói név" value={username} onChangeHandler={setUsername} />
      <Input inputType="password" placeHolder="Jelszó" value={password} onChangeHandler={setPassword} />
      <button onClick={() => handleLogin()} type="button">
        login
      </button>
    </div>
  );
}

export default Login;
