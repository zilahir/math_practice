import { useState, useCallback } from "react";
import api from "../api";

/**
 * @param root0
 * @param root0.pathName
 * @param root0.method
 */
function useApi({ pathName, method }) {
  const [loading, isLoading] = useState(false);
  const [apiReponse, setApiResposne] = useState(undefined);
  const [error, setError] = useState(undefined);

  const apiRequestHandler = useCallback(
    async (body) => {
      isLoading(true);
      if (method === "POST") {
        try {
          const response = await api.post(pathName, {
            ...body,
          });
          setApiResposne(response);
        } catch (apiError) {
          setError(apiError);
        }
        isLoading(false);
      } else {
        try {
          const response = await api.get(pathName);
          setApiResposne(response);
        } catch (apiError) {
          setError(apiError);
        }
        isLoading(false);
      }
    },
    [pathName, method]
  );

  return {
    loading,
    apiReponse,
    error,
    apiRequestHandler,
  };
}

export default useApi;
