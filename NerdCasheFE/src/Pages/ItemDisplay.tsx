import React, { ChangeEvent, useState } from "react";
import { FunctionComponent } from "react";
import ItemDisplayStyles from "./ItemDisplay.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { SearchStyle } from "./itemDisplayMuIStyles";
import { useDispatch } from "react-redux";
import { IMovie, IVideogame } from "../Stores/reducers/ItemInterfaces";
import { ColectionSelector } from "../Components/ColectionSelector";
import { useItemAPI } from "../Hooks/useItemAPI";
import { Carousel } from "../Components/ItemDisplayComponents/Carousel";

//NONE is used for links in navbar to signify that no items need to be fetched on non item display pages
export enum ItemType {
  GAMES = "Games",
  BOOKS = "Books",
  MOVIES = "Movies",
  NONE = "None",
}

interface IItems {
  itemType: ItemType;
}

export const ItemDisplay: FunctionComponent<IItems> = ({ itemType }) => {
  const [isUserCollectionActive, setIsUserCollectionActive] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [previousSearchValue, setPreviousSearchValue] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const { getItems } = useItemAPI(itemType);

  // useEffect(() => {
  //   console.log(itemType);
  //   if (itemType === ItemType.GAMES) {
  //     dispatch({ type: "GET_USER_ITEMS" });
  //   }
  //   setSearchValue("");
  //   setPreviousSearchValue("");
  // }, [itemType]);
  function HasSearchValueChanged() {
    if (
      previousSearchValue == searchValue &&
      previousSearchValue != "" &&
      searchValue != ""
    ) {
      return false;
    }
    return true;
  }
  async function GetItems() {
    if (HasSearchValueChanged() == false) return;
    setIsFetching(true);
    setPreviousSearchValue(searchValue);
    const items = await SetItemFormatting(getItems(searchValue));
    dispatch({ type: "GET_EXTERNAL_ITEMS", newItems: items });
    setIsFetching(false);
  }
  function handleTypeingChange(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void {
    setSearchValue(event.target.value);
  }

  function SetUserCollectionActiveStatus(value: boolean) {
    setIsUserCollectionActive(value);
    setSearchValue("");
  }

  function SetItemFormatting(data: any) {
    if (itemType == ItemType.GAMES) return data as IVideogame[];
    return data as IMovie[];
  }

  return (
    <main className={ItemDisplayStyles.mainContainer}>
      {/* <section className={ItemDisplayStyles.itemDescriptionSection}>
        <ColectionSelector
          isUserCollectionActive={isUserCollectionActive}
          setIsUserCollectionActive={setIsUserCollectionActive}
          setSearchValue={setSearchValue}
          setPreviousSearchValue={setPreviousSearchValue}
        ></ColectionSelector>
        <SelectedGameCard type={itemType}></SelectedGameCard>
      </section> */}
      <section className={ItemDisplayStyles.resultsSection}>
        <section className={ItemDisplayStyles.searchSection}>
          <div className={ItemDisplayStyles.searchBar}>
            <button
              className={ItemDisplayStyles.searchButton}
              onClick={() => {
                isUserCollectionActive ? "" : GetItems();
              }}
            >
              <SearchIcon
                sx={{
                  width: "80%",
                  height: "80%",
                  color: "black",
                }}
              />
            </button>
            <div className={ItemDisplayStyles.searchText}>
              <TextField
                fullWidth
                placeholder={`search for ${itemType}...`}
                sx={SearchStyle.field}
                value={searchValue}
                onChange={handleTypeingChange}
              />
            </div>
            <div>
              <ColectionSelector
                isUserCollectionActive={isUserCollectionActive}
                setIsUserCollectionActive={setIsUserCollectionActive}
                setSearchValue={setSearchValue}
                setPreviousSearchValue={setPreviousSearchValue}
              ></ColectionSelector>
            </div>
          </div>
        </section>
        <section className={ItemDisplayStyles.itemDisplaySection}>
          <Carousel
            isUserCollectionActive={isUserCollectionActive}
            SetUserCollectionActiveStatus={SetUserCollectionActiveStatus}
            itemTypeEnum={itemType}
            isFetching={isFetching}
          />
        </section>
      </section>
    </main>
  );
};
