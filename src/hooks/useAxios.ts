import { useCallback, useState } from "react";
import api from "../services/api";

export const useAxios = () => {
  const [loadedData, setLoadedData] = useState<any>(null);

  const request = useCallback(async (path, config) => {
    let response;
    let data;

    try {
      response = await api(path, config);
      data = response.data ? response.data : null;

      if (!(response.statusText === "OK")) {
        throw new Error(response.statusText);
      }
    } catch {
    } finally {
      if (response && response.data) {
        setLoadedData(response.data);
      } else {
        setLoadedData(null);
      }
      return { response, data };
    }
  }, []);

  return {
    request,
    loadedData,
  };
};
