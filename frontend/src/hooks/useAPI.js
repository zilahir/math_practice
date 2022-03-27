import { useState, useCallback } from "react";
import api from "../api";

/*
A hooks reactban olyan pure function amiben hasznalhatunk react specifickus
funkciokat, ujrafelhasznalhato modon. (Pl useState, useEffect, stb.)

Ebben a hookban 3 stat van (loding, apiResponse, error).

Maga a funcion nagyon egyszerű, egy objecttel tér vissza amiben 4 property van: 

loading, apiReponse, error, apiRequestHandler

Az apiRequestHandler az egyetlen member function  hookban, ez felelős az API hívásért.

Egyetlen paramétert vár, ami egy objektum, egy pathName property-vel, amivel meghadhatjuk, hogy
az apiRequestHandler hívásakor melyik endpointot hívjuk.

Etőtl lesz újrafelhasználható, és nevezhetjük hooknak, mert bármelyik komponensben importálhatjuk
akkor annyi instance lesz belőle amennyiszer initializálva van.

*/

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
