import React, { FunctionComponent, useEffect, useState } from "react";
import CarouselStyles from "./Carousel.module.css";
import { useDispatch } from "react-redux";
import { CardSelectionType, ItemCard } from "./ItemCard";
import { ItemType } from "../../Pages/ItemDisplay";
import {
  IBook,
  IMovie,
  itemType,
  IVideogame,
} from "../../Stores/reducers/ItemInterfaces";
import { useItemAPI } from "../../Hooks/useItemAPI";
import { useItemSelectors } from "../../Hooks/useItemSelectors";
import { LoadingCard } from "./LoadingCard";
import { ItemInfoModal } from "../../Modals/ItemInfoModal";

interface ICarousel {
  isUserCollectionActive: boolean;
  SetUserCollectionActiveStatus: (value: boolean) => void;
  itemTypeEnum: ItemType;
  isFetching: boolean;
  searchText: string;
}
export const Carousel: FunctionComponent<ICarousel> = ({
  isUserCollectionActive,
  SetUserCollectionActiveStatus,
  itemTypeEnum,
  isFetching,
  searchText,
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
  const dispatch = useDispatch();
  const [filteredItems, setFilteredItems] = useState(getUserItems);
  function filterList() {
    if (itemTypeEnum === ItemType.MOVIES) {
      setFilteredItems(
        (getUserItems() as IMovie[]).filter((item: IMovie) =>
          item.name.includes(searchText)
        )
      );
    }
    if (itemTypeEnum === ItemType.BOOKS) {
      setFilteredItems(
        (getUserItems() as IBook[]).filter((item: IBook) =>
          item.name.includes(searchText)
        )
      );
    }
    if (itemTypeEnum === ItemType.GAMES) {
      setFilteredItems(
        (getUserItems() as IVideogame[]).filter((item: IVideogame) =>
          item.name.includes(searchText)
        )
      );
    }
  }
  useEffect(() => {
    if (selectedItemsIsEmpty()) {
      setIsSelectionButtonDisabled(true);
    } else setIsSelectionButtonDisabled(false);
  }, [getSelectedItems()]);

  useEffect(() => {
    if (isUserCollectionActive) {
      filterList();
    }
  }, [searchText]);
  useEffect(() => {
    setFilteredItems(getUserItems());
  }, [getUserItems()]);
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
              ? filteredItems.map((item: itemType, index) => {
                  return (
                    <li key={index}>
                      <ItemCard
                        item={item}
                        selectionType={CardSelectionType.SELECTABLE}
                        setIsInfoModalOpen={setIsInfoModalOpen}
                      />
                    </li>
                  );
                })
              : getSearchedItems().map((item: itemType) => {
                  return (
                    <li key={item.id} style={{ zIndex: 0 }}>
                      <ItemCard
                        item={item}
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
