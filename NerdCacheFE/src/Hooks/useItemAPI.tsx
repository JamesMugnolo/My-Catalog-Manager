import axios from "axios";
import { ItemType } from "../Pages/ItemDisplay";
import { useState } from "react";
import { itemType } from "../Stores/reducers/ItemInterfaces";
import useAxiosPrivate from "./useAxiosPrivate";

export const useItemAPI = (itemTypeEnum: ItemType) => {
  const [response, setResponse] = useState<number[] | itemType[] | null>(null);
  const [error, setError] = useState("");
  const results = { response, error };

  const url = `${process.env.REACT_APP_BASE_URL}/api/${itemTypeEnum}`;
  const axiosObj = axios.create({
    baseURL: url,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  }); // create an axios instance with no interceptors

  const axiosPrivate = useAxiosPrivate(axiosObj); //add interceptors
  function resetStates() {
    setError("");
    setResponse(null);
  }

  const postItems = async (selectedItems: itemType[]) => {
    resetStates();
    return await axiosPrivate
      .post(`${url}/internal/`, {
        items: selectedItems,
      })
      .then((res) => {
        return res.data.insertedUserItemIds;
      });
  };
  const fetchUserItems = async () => {
    return await axiosPrivate.get(`${url}/internal/`).then((res) => {
      return res.data.userItems;
    });
  };
  const deleteUserItems = async (selectedItems: itemType[]) => {
    return await axiosPrivate
      .delete(`${url}/internal/`, {
        data: {
          items: selectedItems,
        },
      })
      .then((res) => {
        return res.data.deletedUserItemIds;
      });
  };
  async function getItems(searchValue: string) {
    const Items = await axiosPrivate
      .get(`${url}/external/${searchValue}`)
      .then(function (response) {
        return response.data;
      })
      .catch((err) => {
        return [];
      });
    return Items;
  } //SetItemFormatting(response.data);
  return { results, postItems, getItems, fetchUserItems, deleteUserItems };
};
