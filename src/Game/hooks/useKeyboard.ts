import { useCallback, useEffect } from "react";

const useKeyboard = (
  onChange: (x: number, y: number) => void,
  onRotate: () => void
) => {
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          onChange(-1, 0);
          break;
        case "ArrowRight":
          onChange(1, 0);
          break;
        case "ArrowDown":
          onChange(0, 1);
          break;
        case "ArrowUp":
          onRotate();
          break;
      }
    },
    [onChange]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  });
};

export default useKeyboard;
