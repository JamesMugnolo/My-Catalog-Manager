import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import TileSectionStyles from "./TileSection.module.css";
import { StatCard } from "./StatCard";
import { DateCard } from "./DateCard";
import {
  IBook,
  IItems,
  IMovie,
  IVideogame,
  itemType,
} from "../../Stores/reducers/ItemInterfaces";
import { ItemType } from "../../Pages/ItemDisplay";

interface ITileSection {
  item: itemType | null;
  type: ItemType;
}

export const TileSection: FunctionComponent<ITileSection> = ({
  item,
  type,
}) => {
  function GetHeader() {
    if (type == ItemType.GAMES) return "On IGDB";
    if (type == ItemType.MOVIES) return "On TMDB";
    if (type == ItemType.BOOKS) return "On OpenLibrary";
  }
  return (
    <div className={TileSectionStyles.tileSectionContainer}>
      {item != null && item.rating != null ? (
        <div className={TileSectionStyles.tileContainer}>
          <h3 className="header">Rating</h3>
          <StatCard stat={item.rating.toString() + "%"} header=""></StatCard>
        </div>
      ) : (
        ""
      )}
      {type == ItemType.MOVIES ? (
        <div className={TileSectionStyles.tileContainer}>
          <StatCard
            stat={
              item == null ? "--" : `${(item as IMovie).runtime.toString()}`
            }
            header="Runtime"
            subHeader="(in minutes)"
          ></StatCard>
        </div>
      ) : (
        ""
      )}
      {type == ItemType.BOOKS && item != null ? (
        <>
          <div className={TileSectionStyles.tileContainer}>
            <StatCard
              stat={`${(item as IBook).numPages.toString()}`}
              header="Pages"
              subHeader="(average)"
            ></StatCard>
          </div>
          <div className={TileSectionStyles.tileContainer}>
            <StatCard
              stat={`${(item as IBook).numEditions.toString()}`}
              header="Editions"
            ></StatCard>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
