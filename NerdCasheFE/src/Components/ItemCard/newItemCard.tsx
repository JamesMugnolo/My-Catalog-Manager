import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import NICStyles from "./newItemCard.module.css";
import {
  IBook,
  IMovie,
  IVideogame,
  itemType,
} from "../../Stores/reducers/ItemInterfaces";
import { ItemType } from "../../Pages/ItemDisplay";
import { Select } from "@mui/material";
import { DropdownMenu } from "./DropdownMenu";
import { TextSlider } from "./TextSlider";

interface INIC {
  item: itemType;
  type: ItemType;
}

export const NewItemCard: FunctionComponent<INIC> = ({ item, type }) => {
  function getContributers() {
    // if (type == ItemType.BOOKS) {
    //   return <DropdownMenu menuItems={(item as IBook).authors}></DropdownMenu>;
    // }
    // if (type == ItemType.MOVIES) {
    //   return (item as IMovie).director;
    // }
    // if (type == ItemType.GAMES) {
    //   return (
    //     <DropdownMenu menuItems={(item as IVideogame).companies}></DropdownMenu>
    //   );
    // }
  }

  return (
    <div className={NICStyles.CardContainer}>
      <section className={NICStyles.TitleSection}>
        <TextSlider text={item.name}></TextSlider>
        {}
      </section>
      <section className={NICStyles.ItemDetailSection}>
        <section className={NICStyles.ImageSection}>
          <img src={item.image_url} className={NICStyles.displayImage}></img>
        </section>
        <section className={NICStyles.InfoSection}>
          <div className={NICStyles.StatContainer}></div>
          <div className={NICStyles.ListContainer}></div>
          <div className={NICStyles.DescriptionContainer}></div>
        </section>
      </section>
    </div>
  );
};
