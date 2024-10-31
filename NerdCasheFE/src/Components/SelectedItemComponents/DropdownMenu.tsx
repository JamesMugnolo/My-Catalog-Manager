import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DropDownStyles from "./DropdownMenu.module.css";
import SelectedItemCardStyles from "./SelectedItemDisplay.module.css";
import { motion } from "framer-motion";
import { useClickOut } from "../../Hooks/useClickOut";
interface IDropdownMenu {
  menuItems: string[];
  dRef: React.RefObject<HTMLDivElement>;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  isExpanded: boolean;
  title: string;
}

export const DropdownMenu: FunctionComponent<IDropdownMenu> = ({
  menuItems,
  dRef,
  setIsExpanded,
  isExpanded,
  title,
}) => {
  const [isFullSize, setIsFullSize] = useState(false);
  const bRef = useRef(null);
  const pageRef = useRef<HTMLDivElement>(null);
  useClickOut(bRef, [setIsFullSize, setIsExpanded]);
  const [pageHeight, setPageHeight] = useState("");
  useEffect(() => {
    getPageHeight();
  }, [isFullSize]);

  function handleClick() {
    setIsExpanded(!isExpanded);
    setIsFullSize(!isFullSize);
  }
  function getPageHeight() {
    if (!isFullSize || pageRef === null || pageRef.current === null) {
      setPageHeight("");
      return;
    }
    setPageHeight(`${pageRef.current?.clientHeight + 40}px`);
  }
  return (
    <>
      <div
        className={DropDownStyles.dropdown}
        style={{
          zIndex: isExpanded ? 200 : 0,
          display: "flex",
          flexDirection: "column",
        }}
        ref={dRef}
      >
        <h3 className={SelectedItemCardStyles.header}>{title}</h3>
        <div
          style={{
            zIndex: isExpanded ? 200 : 0,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <motion.div
            transition={{ layout: { duration: 0.75, type: "spring" } }}
            layout
            className={`${DropDownStyles.dropdownContainer}  ${
              isFullSize ? DropDownStyles.overflowContainer : null
            }`}
            style={{
              padding: isFullSize ? "1rem" : ".5rem",
              height: pageHeight,
            }}
          >
            <div ref={pageRef} style={{ width: "100%" }}>
              <motion.div
                layout
                className={` ${isFullSize ? DropDownStyles.textContainer : ""}`}
              >
                <motion.h2 layout="position" className={DropDownStyles.text}>
                  {menuItems[0]}
                </motion.h2>
              </motion.div>

              {isFullSize &&
                menuItems.map((cont: string) => {
                  if (menuItems[0] != cont) {
                    return (
                      <>
                        <motion.div
                          className={DropDownStyles.textSpacer}
                        ></motion.div>
                        <motion.div
                          layout
                          key={cont}
                          className={DropDownStyles.textContainer}
                        >
                          <motion.h2 layout className={DropDownStyles.text}>
                            {cont}
                          </motion.h2>
                        </motion.div>
                      </>
                    );
                  }
                })}
            </div>
          </motion.div>
          {menuItems.length > 1 && (
            <button
              onClick={handleClick}
              className={`${DropDownStyles.expandButton} ${
                isFullSize ? DropDownStyles.arrowUp : DropDownStyles.arrowDown
              }`}
              ref={bRef}
            >
              <ArrowDropDownIcon
                sx={{
                  width: "100%",
                  height: "100%",
                  color: "white",
                }}
              ></ArrowDropDownIcon>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
