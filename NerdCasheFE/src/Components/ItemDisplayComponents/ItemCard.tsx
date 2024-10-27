import React, { FunctionComponent, useEffect, useState } from "react";
import ItemCardStyles from "./ItemCard.module.css";
import { itemType } from "../../Stores/reducers/ItemInterfaces";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import { appState } from "../../Stores/appStore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
export enum CardSelectionType {
  SELECTABLE,
  UNSELECTABLE,
}
interface IItemCard {
  item: itemType;
  selectionType: CardSelectionType;
  setIsInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ItemCard: FunctionComponent<IItemCard> = ({
  item,
  selectionType,
  setIsInfoModalOpen,
}) => {
  const dispatch = useDispatch();
  const [isActiveSelection, setIsActiveSelection] = useState(false);
  function UpdateActiveSelection() {
    setIsActiveSelection(!isActiveSelection);
  }

  const SelectedItemsSize = useSelector((state: appState) => {
    return state.items!.selectedItems.length;
  });

  //this is needed to make sure item card styling doesnt cary over
  //when deleting items.
  useEffect(() => {
    if (SelectedItemsSize == 0 && isActiveSelection == true)
      UpdateActiveSelection();
  }, [SelectedItemsSize]);

  function HandleButtonClick() {
    UpdateActiveSelection();

    if (!isActiveSelection) {
      dispatch({
        type: "ADD_TO_SELECTED_ITEM",
        item: item,
      });
    } else {
      dispatch({
        type: "REMOVE_FROM_SELECTED_ITEMS",
        itemTitle: item.name,
      });
    }
  }
  function openInfoModal() {
    dispatch({
      type: "UPDATE_CURRENTLY_SELECTED_ITEM",
      selectedItem: item,
    });
    setIsInfoModalOpen(true);
  }
  return (
    <>
      <div
        className={`${ItemCardStyles.displayCard} ${
          isActiveSelection && selectionType == CardSelectionType.SELECTABLE
            ? ItemCardStyles.displayCardActive
            : ""
        }`}
        onClick={(event) => {
          event.stopPropagation();
          dispatch({
            type: "UPDATE_CURRENTLY_SELECTED_ITEM",
            selectedItem: item,
          });
        }}
      >
        {selectionType == CardSelectionType.UNSELECTABLE ? (
          " "
        ) : (
          <div
            className={`
          ${ItemCardStyles.displayOverlay}  ${
              isActiveSelection ? ItemCardStyles.displayOverlayActive : ""
            }
        `}
          >
            <button
              className={ItemCardStyles.infoButton}
              onClick={(event) => {
                event.stopPropagation();
                openInfoModal();
              }}
            >
              <InfoOutlinedIcon sx={{ fontSize: "2.5rem" }}></InfoOutlinedIcon>
            </button>
            <button
              className={`${ItemCardStyles.displayOverlayButton} ${
                isActiveSelection
                  ? ItemCardStyles.displayOverlayButtonActive
                  : ""
              }`}
              onClick={(event) => {
                event.stopPropagation();
                HandleButtonClick();
              }}
            >
              <CheckIcon
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bolder",
                }}
                className={ItemCardStyles.CheckIcon}
              />
            </button>
          </div>
        )}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
            width: "30%",
            height: "25%",
            position: "absolute",
            top: -1,
            left: -1,
            margin: 0,
            zIndex: 1,
            clipPath: "polygon(0 0, 100% 0, 0 100%)",
            display: "block",
          }}
        ></div>
        <img src={item.image_url} className={ItemCardStyles.displayImage}></img>
      </div>
    </>
  );
};
