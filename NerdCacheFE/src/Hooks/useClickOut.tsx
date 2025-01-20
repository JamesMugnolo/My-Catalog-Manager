import { useEffect } from "react";
export const useClickOut = (
  ref: React.RefObject<HTMLElement>,
  setStateArr: React.Dispatch<React.SetStateAction<boolean>>[]
) => {
  useEffect(() => {
    const closeDropdown = (e: any) => {
      if (ref === null) return;
      if (ref.current === null) return;

      if (!ref.current.contains(e.target)) {
        for (const setState of setStateArr) {
          setState(false);
        }
      }
    };
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);
};
