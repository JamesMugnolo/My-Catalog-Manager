import React, { FunctionComponent, ReactNode, useRef, useState } from "react";
import DescriptionSecionStyles from "./DescriptionSection.module.css";
import UpArrowIcon from "@mui/icons-material/KeyboardArrowUp";
import DownArrowIcon from "@mui/icons-material/KeyboardArrowDown";
import LeftArrowIcon from "@mui/icons-material/KeyboardArrowLeft";
import RightArrowIcon from "@mui/icons-material/KeyboardArrowRight";
import { useIsOverflow } from "../../Hooks/useIsOverflow";
import useResizeObserver from "@react-hook/resize-observer";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "../../Hooks/useMediaQuery";

interface IDescriptionSection {
  description?: string | null;
  setIsDescOverflowing?: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  overflowAxis: "horizontal" | "vertical";
}

export const DescriptionSection: FunctionComponent<IDescriptionSection> = ({
  description,
  setIsDescOverflowing,
  children,
  overflowAxis,
}) => {
  const DescriptionRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [hasHorizOverflow, setHasHorizOverflow] = useState(false);
  const [hasVertOverflow, setHasVertOverflow] = useState(false);
  const { isMobileView } = useMediaQuery();
  function handleScrollButton(direction: "pos" | "neg") {
    const { current } = DescriptionRef;
    if (current) {
      const scrollAmount = direction === "pos" ? 150 : -150;
      if (overflowAxis == "horizontal") {
        console.log("horisontal");
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      } else {
        console.log("vert");
        current.scrollBy({ top: scrollAmount, behavior: "smooth" });
      }
    }
  }
  useResizeObserver(spanRef, (entry) => {
    console.log(entry);
    if (!entry) return;
    if (!DescriptionRef || DescriptionRef.current == undefined) return;
    if (!spanRef || spanRef.current == undefined) return;
    setHasOverflow(
      Math.floor(entry.target.getBoundingClientRect().height) >
        DescriptionRef.current.clientHeight ||
        Math.floor(entry.target.getBoundingClientRect().width) >
          DescriptionRef.current.clientWidth
    );
    setHasHorizOverflow(
      spanRef.current.clientWidth > DescriptionRef.current.clientWidth
    );
    setHasVertOverflow(
      spanRef.current.clientHeight > DescriptionRef.current.clientHeight
    );
    console.log(
      spanRef.current.clientHeight > DescriptionRef.current.clientHeight
    );
    console.log("span: " + spanRef.current.clientHeight);
    console.log("div: " + DescriptionRef.current.clientHeight);
    if (setIsDescOverflowing != undefined) {
      console.log("in condition");
      console.log(
        spanRef.current.clientHeight > DescriptionRef.current.clientHeight
      );
      setIsDescOverflowing(
        spanRef.current.clientHeight > DescriptionRef.current.clientHeight
      );
    }
  });
  return (
    <div className={DescriptionSecionStyles.DescriptionSection} style={{}}>
      {hasHorizOverflow && overflowAxis == "horizontal" && !isMobileView && (
        <motion.div
          layout
          className={DescriptionSecionStyles.DescriptionScrollSection}
        >
          <button className={DescriptionSecionStyles.arrowButton}>
            <LeftArrowIcon
              sx={{
                textAlign: "center",
                color: "white",
                height: "100%",
                width: "100%",
              }}
              onClick={() => handleScrollButton("neg")}
            />
          </button>
        </motion.div>
      )}
      <motion.div
        layout
        className={DescriptionSecionStyles.DescriptionContainer}
      >
        <div
          className={`${
            DescriptionSecionStyles.DescriptionTextContainer
          } ${""}`}
          ref={DescriptionRef}
          style={{
            alignItems: overflowAxis == "vertical" ? "" : "center",
            justifyContent: overflowAxis == "vertical" ? "center" : "",
          }}
        >
          <motion.span
            layout="position"
            className={Math.random().toString()}
            ref={spanRef}
            style={{
              width: "100%",
              display: "block",
            }}
          >
            <div
              style={{
                width: "100%",
                maxHeight: "100%",
                fontWeight: "80",
              }}
            >
              {description}
            </div>
          </motion.span>
        </div>
      </motion.div>
      {hasVertOverflow && overflowAxis == "vertical" && !isMobileView && (
        <motion.div
          className={DescriptionSecionStyles.DescriptionScrollSection}
          style={{ justifyContent: "space-between" }}
        >
          <motion.button className={DescriptionSecionStyles.arrowButton}>
            <UpArrowIcon
              sx={{
                textAlign: "center",
                color: "white",
                height: "100%",
                width: "100%",
              }}
              onClick={() => handleScrollButton("neg")}
            />
          </motion.button>
          <motion.button className={DescriptionSecionStyles.arrowButton}>
            <DownArrowIcon
              sx={{
                textAlign: "center",
                color: "white",
                height: "100%",
                width: "100%",
              }}
              onClick={() => handleScrollButton("pos")}
            />
          </motion.button>
        </motion.div>
      )}
      {hasHorizOverflow && overflowAxis == "horizontal" && (
        <motion.div
          layout
          className={DescriptionSecionStyles.DescriptionScrollSection}
        >
          <button className={DescriptionSecionStyles.arrowButton}>
            <RightArrowIcon
              sx={{
                textAlign: "center",
                color: "white",
                height: "100%",
                width: "100%",
              }}
              onClick={() => handleScrollButton("pos")}
            />
          </button>
        </motion.div>
      )}
    </div>
  );
};
