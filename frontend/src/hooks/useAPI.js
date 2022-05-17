import { useState, useCallback, useEffect } from "react";
import api from "../api";

/**
 * @param root0
 * @param root0.pathName
 * @param root0.method
 * @param root0.requestOptions
 */
function useApi({ pathName, method }) {
  const [loading, isLoading] = useState(false);
  const [apiReponse, setApiResponse] = useState(undefined);
  const [error, setError] = useState(undefined);

  const apiRequestHandler = useCallback(
    async (body) => {
      isLoading(true);
      if (method === "POST") {
        try {
          const response = await api.post(pathName, body);
          setApiResponse(response.data);
          return response.data;
        } catch (apiError) {
          setError(apiError);
          return apiError;
        }
      } else if (method === "PATCH") {
        try {
          const response = await api.patch(pathName, body);
          setApiResponse(response.data);
          return response.data;
        } catch (apiError) {
          setError(apiError);
          return apiError;
        }
      }

      return undefined;
    },
    [pathName, method],
  );

  useEffect(() => {
    if (method === "GET") {
      isLoading(true);
      setTimeout(() => {
        api
          .get(pathName)
          .then((response) => {
            setApiResponse(response.data);
          })
          .catch((err) => {
            setError(err);
          })
          .finally(() => {
            isLoading(false);
          });
      }, 500);
    }
  }, [method, pathName]);

  return {
    loading,
    apiReponse,
    error,
    apiRequestHandler,
  };
}

export default useApi;
