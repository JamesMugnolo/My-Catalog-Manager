import React, { FunctionComponent } from "react";
import { ButtonMenu } from "./ButtonMenu";
interface IColectionSelector {
  isUserCollectionActive: boolean;
  setIsUserCollectionActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ColectionSelector: FunctionComponent<IColectionSelector> = ({
  isUserCollectionActive,
  setIsUserCollectionActive,
}) => {
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
        isUserCollectionActive={isUserCollectionActive}
        OnClick={handleMobileButtonClick}
      ></ButtonMenu>
    </>
  );
};
