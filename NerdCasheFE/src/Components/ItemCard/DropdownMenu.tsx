import React, {
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import NICStyles from "./newItemCard.module.css";
import {
  IBook,
  IMovie,
  IVideogame,
  itemType,
} from "../../Stores/reducers/ItemInterfaces";
import { ItemType } from "../../Pages/ItemDisplay";
import { FormControl, MenuItem, Select } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DropDownStyles from "./DropdownMenu.module.css";
import { motion } from "framer-motion";
import { useClickOut } from "../../Hooks/useClickOut";
import { useMediaQuery } from "../../Hooks/useMediaQuery";
interface IDropdownMenu {
  menuItems: string[];
  dRef: React.RefObject<HTMLDivElement>;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  isExpanded: boolean;
}

export const DropdownMenu: FunctionComponent<IDropdownMenu> = ({
  menuItems,
  dRef,
  setIsExpanded,
  isExpanded,
}) => {
  const [isFullSize, setIsFullSize] = useState(false);
  // const [pages, setPages] = useState<JSX.Element[]>([]);
  const bRef = useRef(null);
  const pageRef = useRef<HTMLDivElement>(null);
  useClickOut(bRef, [setIsFullSize, setIsExpanded]);
  const { isMobileView } = useMediaQuery();
  const [pageHeight, setPageHeight] = useState("");
  useEffect(() => {
    getPageHeight();
  }, [isFullSize]);

  function handleClick() {
    console.log();
    setIsExpanded(!isExpanded);
    setIsFullSize(!isFullSize);
  }
  function splitArr(chunkSize: number) {
    const splitArray = [];
    for (let i = 0; i < menuItems.length; i += chunkSize) {
      const chunk = menuItems.slice(i, i + chunkSize);
      splitArray.push(chunk);
    }
    return splitArray;
  }
  function getPages() {
    const resultArr = splitArr(6);
    const pages = [];

    for (const arr of resultArr) {
      pages.push(<></>);
    }
    // setPages(pages);
    return pages;
  }
  function getPageHeight() {
    console.log(!isFullSize || pageRef === null || pageRef.current === null);
    if (!isFullSize || pageRef === null || pageRef.current === null) {
      setPageHeight("");
      return;
    }
    setPageHeight(`${pageRef.current?.clientHeight + 40}px`);
  }
  return (
    <div
      className={DropDownStyles.dropdown}
      style={{ zIndex: isExpanded ? 200 : 0 }}
      ref={dRef}
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
  );
};
