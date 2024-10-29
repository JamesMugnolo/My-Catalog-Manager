import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import CarouselStyles from "./Carousel.module.css";
import { useSelector, useDispatch } from "react-redux";
import { appState } from "../../Stores/appStore";
import { CardSelectionType, ItemCard } from "./ItemCard";
import { ItemType } from "../../Pages/ItemDisplay";
import {
  IItems,
  IMovie,
  IVideogame,
  itemType,
} from "../../Stores/reducers/ItemInterfaces";
import axios from "axios";
import { useItemAPI } from "../../Hooks/useItemAPI";
import { useItemSelectors } from "../../Hooks/useItemSelectors";
import { LoadingCard } from "./LoadingCard";
import { ItemInfoModal } from "../../Modals/ItemInfoModal";

interface ICarousel {
  isUserCollectionActive: boolean;
  SetUserCollectionActiveStatus: (value: boolean) => void;
  itemTypeEnum: ItemType;
  isFetching: boolean;
}
export const Carousel: FunctionComponent<ICarousel> = ({
  isUserCollectionActive,
  SetUserCollectionActiveStatus,
  itemTypeEnum,
  isFetching,
}) => {
  const { postItems, deleteUserItems } = useItemAPI(itemTypeEnum);

  const {
    filterSelectedItemsByIDs,
    selectedItemsIsEmpty,
    userItemsIsEmpty,
    getUserItems,
    getSelectedItems,
    getSearchedItems,
  } = useItemSelectors(itemTypeEnum);

  const [isSelectionButtondisabled, setIsSelectionButtonDisabled] =
    useState(true);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedItemsIsEmpty()) {
      setIsSelectionButtonDisabled(true);
    } else setIsSelectionButtonDisabled(false);
  }, [getSelectedItems()]);

  function GetTitle(): React.ReactNode {
    return !isUserCollectionActive
      ? `Searched ${itemTypeEnum}`
      : `Your ${itemTypeEnum}`;
  }

  async function HandleAddSelectedItemsButtonClick() {
    if (selectedItemsIsEmpty()) return;

    const insertedIDs: number[] = await postItems(getSelectedItems());
    const itemsToAdd: itemType[] = filterSelectedItemsByIDs(insertedIDs);

    dispatch({ type: "ADD_USER_ITEMS", newItems: itemsToAdd });

    SetUserCollectionActiveStatus(true);
    setIsSelectionButtonDisabled(true);
  }
  async function HandleRemoveUserItemsButtonClick() {
    if (userItemsIsEmpty()) return;

    const removedIDs: number[] = await deleteUserItems(getSelectedItems());
    const itemsToRemove: itemType[] = filterSelectedItemsByIDs(removedIDs);

    dispatch({ type: "RESET_CSI_DURRING_ITEM_REMOVAL" });
    dispatch({ type: "REMOVE_USER_ITEMS", itemsToRemove: itemsToRemove });

    if (userItemsIsEmpty()) setIsSelectionButtonDisabled(true);
  }
  return (
    <>
      {isInfoModalOpen && (
        <ItemInfoModal
          type={itemTypeEnum}
          isModalOpen={isInfoModalOpen}
          setIsModalOpen={setIsInfoModalOpen}
        ></ItemInfoModal>
      )}
      <section className={CarouselStyles.carouselContainer}>
        <div className={CarouselStyles.carouselTitleContainer}>
          <h1>{GetTitle()}</h1>
        </div>
        <div className={CarouselStyles.resultsDisplay}>
          {isFetching ? <LoadingCard /> : ""}
          <ul className={CarouselStyles.imageGallery}>
            {isUserCollectionActive
              ? getUserItems().map((game: itemType, index) => {
                  return (
                    <li key={index}>
                      <ItemCard
                        item={game}
                        selectionType={CardSelectionType.SELECTABLE}
                        setIsInfoModalOpen={setIsInfoModalOpen}
                      />
                    </li>
                  );
                })
              : getSearchedItems().map((game: itemType) => {
                  return (
                    <li key={game.id} style={{ zIndex: 0 }}>
                      <ItemCard
                        item={game}
                        selectionType={CardSelectionType.SELECTABLE}
                        setIsInfoModalOpen={setIsInfoModalOpen}
                      />
                    </li>
                  );
                })}
          </ul>
        </div>
        <div className={CarouselStyles.carouselSlider}>
          {isUserCollectionActive ? (
            <button
              className={`${CarouselStyles.carouselSliderListButton} ${CarouselStyles.removeButton}`}
              style={{}}
              disabled={
                isUserCollectionActive && isSelectionButtondisabled
                  ? true
                  : false
              }
              onClick={(event) => {
                HandleRemoveUserItemsButtonClick();
              }}
            >
              Remove Items
            </button>
          ) : (
            ""
          )}
          {!isUserCollectionActive ? (
            <button
              className={`${CarouselStyles.carouselSliderListButton} ${CarouselStyles.addButton}`}
              style={{}}
              disabled={
                !isUserCollectionActive && getSelectedItems().length === 0
                  ? true
                  : false
              }
              onClick={(event) => {
                HandleAddSelectedItemsButtonClick();
              }}
            >
              Add Items
            </button>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
};
