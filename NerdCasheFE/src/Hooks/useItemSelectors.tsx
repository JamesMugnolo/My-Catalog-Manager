import { useSelector } from "react-redux";
import { appState } from "../Stores/appStore";
import { ItemType } from "../Pages/ItemDisplay";
import {
  IBook,
  IMovie,
  IVideogame,
  itemType,
} from "../Stores/reducers/ItemInterfaces";

export const useItemSelectors = (itemTypeEnum: ItemType) => {
  const userItems = useSelector((state: appState) => {
    if (itemTypeEnum == ItemType.GAMES)
      return state.items!.userItems as IVideogame[];
    if (itemTypeEnum == ItemType.MOVIES)
      return state.items!.userItems as IMovie[];
    return state.items!.userItems as IBook[];
  });

  const searchedItems = useSelector((state: appState) => {
    if (itemTypeEnum == ItemType.GAMES)
      return state.items!.searchedItems as IVideogame[];
    if (itemTypeEnum == ItemType.MOVIES)
      return state.items!.searchedItems as IMovie[];
    return state.items!.searchedItems as IBook[];
  });

  const selectedItems = useSelector((state: appState) => {
    if (itemTypeEnum == ItemType.GAMES)
      return state.items!.selectedItems as IVideogame[];
    if (itemTypeEnum == ItemType.MOVIES)
      return state.items!.selectedItems as IMovie[];
    return state.items!.selectedItems as IBook[];
  });

  const filterSelectedItemsByIDs = (itemIDs: number[]) => {
    if (itemIDs != null) {
      return (selectedItems as itemType[]).filter((item: itemType) => {
        return itemIDs.includes(item.id);
      });
    } else {
      return selectedItems;
    }
  };
  const selectedItemsIsEmpty = () => {
    return selectedItems.length == 0;
  };
  const userItemsIsEmpty = () => {
    return userItems.length == 0;
  };
  const searchedItemsIsEmpty = () => {
    return searchedItems.length == 0;
  };
  const getUserItems = () => {
    return userItems;
  };
  const getSearchedItems = () => {
    return searchedItems;
  };
  const getSelectedItems = () => {
    return selectedItems;
  };
  const getItemKeys = () => {
    if (itemTypeEnum == ItemType.BOOKS) {
      const Item = {} as IBook;
      return Object.keys(Item as IBook);
    }
    if (itemTypeEnum == ItemType.GAMES) {
      const Item = {} as IVideogame;
      return Object.keys(Item as IVideogame);
    }
    if (itemTypeEnum == ItemType.MOVIES) {
      const Item = {} as IMovie;
      return Object.keys(Item as IMovie);
    }
    return ["none"];
  };
  return {
    filterSelectedItemsByIDs,
    selectedItemsIsEmpty,
    searchedItemsIsEmpty,
    userItemsIsEmpty,
    getUserItems,
    getSearchedItems,
    getSelectedItems,
    getItemKeys,
  };
};
