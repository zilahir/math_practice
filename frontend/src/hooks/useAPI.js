import { useState, useCallback } from "react";
import api from "../api";

function useApi({ pathName }) {
  const [loading, isLoading] = useState(false);
  const [apiReponse, setApiResposne] = useState(undefined);
  const [error, setError] = useState(undefined);

  const apiRequestHandler = useCallback(async (body) => {
    isLoading(true);
    try {
      const response = await api.post(pathName, {
        ...body,
      });
      setApiResposne(response);
    } catch (apiError) {
      setError(apiError);
    }
    isLoading(false);
  }, [pathName]);

  return {
    loading, apiReponse, error, apiRequestHandler,
  };
}

export default useApi;
