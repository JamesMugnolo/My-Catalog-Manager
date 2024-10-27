import { Button } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { useDispatch } from "react-redux";
import CSelectorStyles from "./ColectionSelector.module.css";
import { ButtonStyles } from "./ColectionSelectionMuiStyles";
import { useMediaQuery } from "../Hooks/useMediaQuery";
import { ButtonMenu } from "./ButtonMenu";
interface IColectionSelector {
  isUserCollectionActive: boolean;
  setIsUserCollectionActive: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setPreviousSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const ColectionSelector: FunctionComponent<IColectionSelector> = ({
  isUserCollectionActive,
  setIsUserCollectionActive,
  setSearchValue,
  setPreviousSearchValue,
}) => {
  const dispatch = useDispatch();
  const { isMobileView } = useMediaQuery();
  function handleMobileButtonClick(collectionType: string) {
    if (collectionType == "Yours" && !isUserCollectionActive)
      setIsUserCollectionActive(true);
    if (collectionType == "External" && isUserCollectionActive)
      setIsUserCollectionActive(false);
  }
  return (
    <>
      <ButtonMenu
        label={"Collections"}
        selectionItems={["Yours", "External"]}
        initialValue={isUserCollectionActive ? "Yours" : "External"}
        OnClick={handleMobileButtonClick}
      ></ButtonMenu>
    </>
  );
};
