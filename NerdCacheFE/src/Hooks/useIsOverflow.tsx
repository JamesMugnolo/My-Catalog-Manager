import { useLayoutEffect, useState } from "react";

export const useIsOverflow = (
  ref: React.RefObject<HTMLElement>,
  isVertialContent: boolean
) => {
  const [hasOverflow, setHasOverflow] = useState(false);
  useLayoutEffect(() => {
    const { current } = ref;
    console.log(ref);
    if (!current) return;

    const { clientWidth, scrollWidth, clientHeight, scrollHeight } = current;

    const trigger = () => {
      console.log(
        isVertialContent
          ? scrollHeight > clientHeight
          : scrollWidth > clientWidth
      );
      setHasOverflow(
        isVertialContent
          ? scrollHeight > clientHeight
          : scrollWidth > clientWidth
      );
    };
    if (current) {
      trigger();
    }
  }, [ref.current?.offsetHeight, isVertialContent]);
  return hasOverflow;
};
