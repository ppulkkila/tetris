import React, { useCallback, useEffect, useRef, useState } from "react";

const useArea = (): [
  React.MutableRefObject<HTMLDivElement | null>,
  { w: number; h: number } | undefined
] => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [area, setArea] = useState<{ w: number; h: number } | undefined>(
    undefined
  );

  const updateArea = useCallback(() => {
    const width = ref.current?.clientWidth;
    const height = ref.current?.clientHeight;

    if (width && height && (area?.w !== width || area?.h !== height)) {
      setArea({ w: width, h: height });
    }
  }, []);

  useEffect(() => {
    updateArea();

    window.addEventListener("resize", updateArea);

    return () => window.removeEventListener("resize", updateArea);
  }, [updateArea]);

  return [ref, area];
};

export default useArea;
