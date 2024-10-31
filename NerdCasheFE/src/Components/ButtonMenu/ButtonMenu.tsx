import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import ButtonMenuStyles from "./ButtonMenuStyles.module.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useClickOut } from "../../Hooks/useClickOut";
interface IButtonMenu {
  label: string;
  selectionItems: string[];
  initialValue: string;
  OnClick: (collectionType: string) => void;
  isUserCollectionActive: boolean;
}

export const ButtonMenu: FunctionComponent<IButtonMenu> = ({
  label,
  selectionItems,
  initialValue,
  OnClick,
  isUserCollectionActive,
}) => {
  const [selectedItem, setSelectedItem] = useState(initialValue);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  useClickOut(divRef, [setIsMenuActive]);
  useEffect(() => {
    if (isUserCollectionActive) {
      setSelectedItem(selectionItems[0]);
    } else {
      setSelectedItem(selectionItems[1]);
    }
  }, [isUserCollectionActive]);

  const handleChange = (item: string) => {
    setSelectedItem(item);
    OnClick(item);
  };
  return (
    <>
      <div className={ButtonMenuStyles.dropdown}>
        <div
          className={ButtonMenuStyles.button}
          onClick={(e) => {
            setIsMenuActive(!isMenuActive);
          }}
          ref={divRef}
        >
          <span className={ButtonMenuStyles.buttonLabel}>
            <label>{label}</label>
          </span>
          <span className={ButtonMenuStyles.buttonContent}>
            <label>{selectedItem}</label>
            <ArrowDropDownIcon
              className={ButtonMenuStyles.arrow}
            ></ArrowDropDownIcon>
          </span>
        </div>
        {isMenuActive && (
          <div className={ButtonMenuStyles.itemContainer}>
            {selectionItems.map((item: string, index) => {
              return (
                <>
                  <div
                    key={item}
                    className={`${ButtonMenuStyles.item} ${
                      selectedItem === item ? ButtonMenuStyles.active : ""
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
