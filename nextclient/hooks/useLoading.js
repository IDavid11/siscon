import React, { useEffect, useState } from "react";
import LoadingContext from "../context/LoadingContext";

export default function LoadingState({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = (value) => {
    setIsLoading(value);
  };

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  return (
    <LoadingContext.Provider
      value={{
        isLoading: isLoading,
        handleLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
