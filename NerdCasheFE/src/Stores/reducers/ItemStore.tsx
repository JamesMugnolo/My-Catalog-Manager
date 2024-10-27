import { Reducer } from "react";
import { IItemState, itemType } from "./ItemInterfaces";
import { current } from "@reduxjs/toolkit";

const InitItemState: IItemState = {
  userItems: new Array<itemType>(),
  searchedItems: new Array<itemType>(),
  selectedItems: new Array<itemType>(),
  currentItemDetails: null,
};

export const ItemReducer: Reducer<IItemState | undefined, itemActions> = (
  state,
  action
) => {
  if (state == undefined) {
    state = InitItemState;
  }

  switch (action.type) {
    case "ADD_USER_ITEMS":
      return {
        ...state,
        userItems: [...state.userItems, ...action.newItems],
        selectedItems: [],
        currentItemDetails: null,
      };
    case "REMOVE_USER_ITEMS":
      return {
        ...state,
        userItems: RemoveUserGames(state, action.itemsToRemove),
        selectedItems: [],
      };
    case "GET_EXTERNAL_ITEMS":
      return {
        ...state,
        searchedItems: action.newItems,
      };
    case "UPDATE_CURRENTLY_SELECTED_ITEM":
      return {
        ...state,
        currentItemDetails: action.selectedItem,
      };
    case "ADD_TO_SELECTED_ITEM":
      if (
        state.selectedItems.find((item) => item.id == action.item.id) !=
        undefined
      )
        return { ...state };
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.item],
      };
    case "REMOVE_FROM_SELECTED_ITEMS": {
      return {
        ...state,
        selectedItems: RemoveGameFromList(state, action.itemTitle),
      };
    }
    case "RESET_CSI_DURRING_ITEM_REMOVAL": {
      return {
        ...state,
        currentItemDetails: ResetOrKeepCurrentItemDetails(state),
      };
    }
    case "CHANGE_ITEM_COLLECTON": {
      return {
        userItems: [],
        searchedItems: [],
        selectedItems: [],
        currentItemDetails: null,
      };
    }
    case "RESET_CURRENTLY_SELECTED_ITEM": {
      return {
        ...state,
        currentItemDetails: null,
      };
    }
    default:
      return state;
  }
};
interface add_user_items_action {
  type: "ADD_USER_ITEMS";
  newItems: itemType[];
}
interface delete_user_items_action {
  type: "REMOVE_USER_ITEMS";
  itemsToRemove: itemType[];
}
interface get_external_items_action {
  type: "GET_EXTERNAL_ITEMS";
  newItems: itemType[];
}
interface update_currently_selected_item {
  type: "UPDATE_CURRENTLY_SELECTED_ITEM";
  selectedItem: itemType;
}
interface add_to_selected_item_action {
  type: "ADD_TO_SELECTED_ITEM";
  item: itemType;
}
interface remove_from_selected_items_action {
  type: "REMOVE_FROM_SELECTED_ITEMS";
  itemTitle: string;
}
interface change_item_collecton_action {
  type: "CHANGE_ITEM_COLLECTON";
}
interface reset_currently_selected_item {
  type: "RESET_CURRENTLY_SELECTED_ITEM";
}
interface reset_CSI_Durring_Item_removal {
  type: "RESET_CSI_DURRING_ITEM_REMOVAL";
}
type itemActions =
  | add_user_items_action
  | delete_user_items_action
  | get_external_items_action
  | update_currently_selected_item
  | add_to_selected_item_action
  | remove_from_selected_items_action
  | change_item_collecton_action
  | reset_currently_selected_item
  | reset_CSI_Durring_Item_removal;

function RemoveGameFromList(state: IItemState, title: string) {
  const newGamesArr = [...state.selectedItems].filter(
    (game) => game.name != title
  );
  return newGamesArr;
}
function RemoveUserGames(state: IItemState, itemsToRemove: itemType[]) {
  return state.userItems.filter((item) => {
    return !itemsToRemove.includes(item);
  });
}
function ResetOrKeepCurrentItemDetails(state: IItemState): itemType | null {
  for (const item of state.selectedItems) {
    if (item.id === state.currentItemDetails?.id) {
      return null;
    }
  }
  return state.currentItemDetails;
}
