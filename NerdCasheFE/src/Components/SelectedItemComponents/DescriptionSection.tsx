import React, { FunctionComponent, useRef, useState } from "react";
import DescriptionSecionStyles from "./DescriptionSection.module.css";
import UpArrowIcon from "@mui/icons-material/KeyboardArrowUp";
import DownArrowIcon from "@mui/icons-material/KeyboardArrowDown";
import useResizeObserver from "@react-hook/resize-observer";
import { motion } from "framer-motion";
import { useMediaQuery } from "../../Hooks/useMediaQuery";

interface IDescriptionSection {
  description?: string | null;
  setIsDescOverflowing?: React.Dispatch<React.SetStateAction<boolean>>;
  overflowAxis: "horizontal" | "vertical";
}

export const DescriptionSection: FunctionComponent<IDescriptionSection> = ({
  description,
  setIsDescOverflowing,
  overflowAxis,
}) => {
  const DescriptionRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [hasVertOverflow, setHasVertOverflow] = useState(false);
  const { isMobileView } = useMediaQuery();
  function handleScrollButton(direction: "pos" | "neg") {
    const { current } = DescriptionRef;
    if (current) {
      const scrollAmount = direction === "pos" ? 150 : -150;
      current.scrollBy({ top: scrollAmount, behavior: "smooth" });
    }
  }
  useResizeObserver(spanRef, (entry) => {
    console.log(entry);
    if (!entry) return;
    if (!DescriptionRef || DescriptionRef.current == undefined) return;
    if (!spanRef || spanRef.current == undefined) return;
    setHasVertOverflow(
      spanRef.current.clientHeight > DescriptionRef.current.clientHeight
    );
    if (setIsDescOverflowing != undefined) {
      setIsDescOverflowing(
        spanRef.current.clientHeight > DescriptionRef.current.clientHeight
      );
    }
  });
  return (
    <div className={DescriptionSecionStyles.DescriptionSection} style={{}}>
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
    </div>
  );
};
