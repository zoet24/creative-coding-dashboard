import { useEffect, useRef } from "react";

export const useSyncConfig = <T>(value: T) => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
};
