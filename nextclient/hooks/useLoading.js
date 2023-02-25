import React, { useEffect, useState } from "react";

export default function useLoading({ value }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(value);
  }, [value]);

  return { isLoading, setIsLoading };
}
