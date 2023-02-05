import { useState, useEffect } from "react";
import { fetchListado } from "../services/fetchListado";
import { formatResult } from "../utils/format";

export function useFileSearch({ search, listado }) {
  const [data, setData] = useState([]);
  const [findData, setFindData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchListado(listado).then((data) => {
      setData(data);
      console.log(data);
      setIsLoading(false);
    });
    data.map((d, index) => {
      const findDataVar = findData;
      d = Object.values(d).join();
      console.log(d);
      findDataVar[index] = d;
      setFindData([...findDataVar]);
    });

    const results = findData.filter((find) =>
      find.toUpperCase().includes(search.toUpperCase())
    );
    const formatted_results = formatResult({ listado, results });

    if (results.length > 0) {
      setFindData(formatted_results);
      setIsError(false);
    }

    if (results.length === 0 && search !== "") {
      setFindData([]);
      setIsError(true);
    }
  }, [search]);

  return { data, findData, isLoading, isError };
}
