import { useEffect, useState } from "react";

export const useMediaQuery = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobileView, setIsMobileView] = useState(false);
  const mobileWidthBreakpoint = 768; //pixels

  function handleResize() {
    setWidth(window.innerWidth);
  }
  function updateMobileView() {
    if (isMobileView && width > mobileWidthBreakpoint) {
      setIsMobileView(false);
    }
    if (!isMobileView && width <= mobileWidthBreakpoint) {
      setIsMobileView(true);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    updateMobileView();
  }, [width]);
  return { isMobileView };
};
