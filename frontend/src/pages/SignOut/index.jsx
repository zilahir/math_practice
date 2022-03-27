import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import authContext from "../../context/AuthContext/context";

function SignOut() {
  const { signOut } = useContext(authContext);
  const navigate = useNavigate();
  useEffect(() => {
    signOut();
    navigate("/");
  }, []);
  return (
    <div>
      <p>
        Logging out
      </p>
    </div>
  );
}

export default SignOut;
