import axios from "axios";
import { ItemType } from "../Pages/ItemDisplay";
import { FunctionComponent, useState } from "react";
import { itemType } from "../Stores/reducers/ItemInterfaces";
import { useSelector } from "react-redux";
import { appState } from "../Stores/appStore";

export const useItemAPI = (itemTypeEnum: ItemType) => {
  const [response, setResponse] = useState<number[] | itemType[] | null>(null);
  const [error, setError] = useState("");
  const results = { response, error };

  const url = `${process.env.REACT_APP_BASE_URL}api/${itemTypeEnum}`;

  function resetStates() {
    setError("");
    setResponse(null);
  }

  const username = useSelector((state: appState) => {
    return state.users!.user;
  });

  const postItems = async (selectedItems: itemType[]) => {
    resetStates();
    return await axios
      .post(`${url}/internal/`, {
        username: username,
        items: selectedItems,
      })
      .then((res) => {
        return res.data.insertedUserItemIds;
      });
  };
  const fetchUserItems = async () => {
    return await axios
      .get(`${url}/internal/`, {
        params: {
          username: username,
        },
      })
      .then((res) => {
        return res.data.userItems;
      });
  };
  const deleteUserItems = async (selectedItems: itemType[]) => {
    return await axios
      .delete(`${url}/internal/`, {
        data: {
          username: username,
          items: selectedItems,
        },
      })
      .then((res) => {
        return res.data.deletedUserItemIds;
      });
  };
  return { results, postItems, fetchUserItems, deleteUserItems };
};
