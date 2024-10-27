import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import DropdownStyles from "./DropdownStyles.module.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useClickOut } from "../Hooks/useClickOut";
interface IButtonMenu {
  label: string;
  selectionItems: string[];
  initialValue: string;
  OnClick: (collectionType: string) => void;
}

export const ButtonMenu: FunctionComponent<IButtonMenu> = ({
  label,
  selectionItems,
  initialValue,
  OnClick,
}) => {
  const [selectedItem, setSelectedItem] = useState(initialValue);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  useClickOut(divRef, [setIsMenuActive]);

  const handleChange = (item: string) => {
    setSelectedItem(item);
    OnClick(item);
  };
  return (
    <>
      <div className={DropdownStyles.dropdown}>
        <div
          className={DropdownStyles.button}
          onClick={(e) => {
            setIsMenuActive(!isMenuActive);
          }}
          ref={divRef}
        >
          <span className={DropdownStyles.buttonLabel}>
            <label>{label}</label>
          </span>
          <span className={DropdownStyles.buttonContent}>
            <label>{selectedItem}</label>
            <ArrowDropDownIcon
              className={DropdownStyles.arrow}
            ></ArrowDropDownIcon>
          </span>
        </div>
        {isMenuActive && (
          <div className={DropdownStyles.itemContainer}>
            {selectionItems.map((item: string, index) => {
              return (
                <>
                  <div
                    key={item}
                    className={`${DropdownStyles.item} ${
                      selectedItem === item ? DropdownStyles.active : ""
                    } `}
                    onClick={(e) => handleChange(item)}
                  >
                    {item}
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
