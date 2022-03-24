import { useState, useEffect } from "react";
import api from "../api";

function useApi({ pathName, body }) {
  const [loading, isLoading] = useState(false);
  const [apiReponse, setApiResposne] = useState(undefined);
  // const [error, setError] = useState();

  useEffect(() => {
    isLoading(true);
    async function fetchData() {
      const response = await api.post(pathName, {
        ...body,
      });
      isLoading(false);
      return response;
    }

    const response = fetchData();
    setApiResposne(response);
  }, [pathName, body]);

  return { loading, apiReponse };
}

export default useApi;
