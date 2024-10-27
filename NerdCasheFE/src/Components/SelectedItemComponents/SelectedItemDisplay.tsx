import React, { FunctionComponent, useState } from "react";
import SelectedItemCardStyles from "./SelectedItemDisplay.module.css";
import { DescriptionSection } from "./DescriptionSection";
import { useSelector } from "react-redux";
import { appState } from "../../Stores/appStore";
import { SelectedItemHeader } from "./SelectedItemHeader";
import { TileSection } from "./TileSection";
import { ListSection } from "./ListSection";
import { ItemType } from "../../Pages/ItemDisplay";
import {
  IBook,
  IItems,
  IMovie,
  IVideogame,
  itemType,
} from "../../Stores/reducers/ItemInterfaces";
import { DropdownMenu } from "../ItemCard/DropdownMenu";
import { AnimatePresence, motion } from "framer-motion";
interface ISelectedGameCard {
  type: ItemType;
  closeModal: () => void;
}

export const SelectedGameCard: FunctionComponent<ISelectedGameCard> = ({
  type,
  closeModal,
}) => {
  const currentSelectedItem = useSelector((state: appState) => {
    return state.items!.currentItemDetails as itemType;
  });
  const [isDescOverflowing, setIsDescOverflowing] = useState(false);
  function getContributor(contentType: ItemType) {
    if (contentType == ItemType.GAMES)
      return (currentSelectedItem as IVideogame).companies;
    if (contentType == ItemType.MOVIES)
      return [(currentSelectedItem as IMovie).director];
    if (contentType == ItemType.BOOKS)
      return (currentSelectedItem as IBook).authors;
    return ["No contributers given"];
  }
  function getContentList(contentType: ItemType) {
    if (currentSelectedItem == null) return ["--"];
    if (contentType == ItemType.GAMES)
      return (currentSelectedItem as IVideogame).platforms != null &&
        (currentSelectedItem as IVideogame).platforms != undefined
        ? (currentSelectedItem as IVideogame).platforms
        : ["--"];
    if (contentType == ItemType.MOVIES)
      return (currentSelectedItem as IMovie).cast;
    return [];
  }
  function getExtraContent(contentType: ItemType): JSX.Element {
    const content: JSX.Element = (
      <div>
        <h3 className={SelectedItemCardStyles.header}>Rating</h3>
        <h2 className={SelectedItemCardStyles.container}>
          {currentSelectedItem.rating + "%"}
        </h2>
      </div>
    );
    return content;
  }
  function getFormattedDate(): React.ReactNode {
    const date = new Date(currentSelectedItem.release_date);
    return (
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
    );
  }

  function getContentType(type: ItemType): React.ReactNode {
    if (type == ItemType.GAMES) return "Platforms";
    if (type == ItemType.MOVIES) return "Actors";
    if (type == ItemType.BOOKS) return "";
  }

  return (
    <section
      className={SelectedItemCardStyles.itemDisplayContainer}
      style={{ display: "flex" }}
      onClick={(e) => {
        e.stopPropagation;
        closeModal();
      }}
    >
      <div
        className={SelectedItemCardStyles.card}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={SelectedItemCardStyles.imgContainer}>
          <img
            src={
              currentSelectedItem === null ? "" : currentSelectedItem.image_url
            }
            alt=""
            className={SelectedItemCardStyles.itemImage}
          />
          <div className={SelectedItemCardStyles.headerContainer}>
            <h1
              className={
                SelectedItemCardStyles.container +
                " " +
                SelectedItemCardStyles.title
              }
            >
              {currentSelectedItem.name}
            </h1>
          </div>
        </div>
      </div>
      <div className={SelectedItemCardStyles.infoContainer}>
        <div
          className={SelectedItemCardStyles.card}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={SelectedItemCardStyles.listSection}>
            <div style={{ zIndex: 1 }}>
              <h3 className={SelectedItemCardStyles.header}>Contributors</h3>
              <SelectedItemHeader
                contributor={getContributor(type)}
              ></SelectedItemHeader>
            </div>
            <div>
              <h3 className={SelectedItemCardStyles.header}>
                {getContentType(type)}
              </h3>

              <SelectedItemHeader
                contributor={getContentList(type)}
              ></SelectedItemHeader>
            </div>
            <div className={SelectedItemCardStyles.bonusInfo}>
              {getExtraContent(type)}
            </div>
            <div>
              <h3 className={SelectedItemCardStyles.header}>Release date</h3>
              <h2
                className={
                  SelectedItemCardStyles.container +
                  " " +
                  SelectedItemCardStyles.date
                }
              >
                {getFormattedDate()}
              </h2>
            </div>
          </div>
        </div>
        <div
          className={SelectedItemCardStyles.card}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {currentSelectedItem.description !== undefined ? (
            <div style={{ height: "100%" }}>
              <DescriptionSection
                description={currentSelectedItem.description}
                overflowAxis="vertical"
                setIsDescOverflowing={setIsDescOverflowing}
              >
                <div
                  className={SelectedItemCardStyles.DescriptionContainer}
                  style={{
                    width: "100%",
                    maxHeight:
                      currentSelectedItem.description != null
                        ? "100%"
                        : "fit-content",
                    fontWeight: "80",
                  }}
                >
                  {currentSelectedItem != null &&
                  currentSelectedItem.description != null
                    ? currentSelectedItem.description
                    : "no description"}
                </div>
              </DescriptionSection>
            </div>
          ) : (
            <div>
              <h2
                style={{
                  fontSize: "larger",
                  fontWeight: "80",
                }}
              >
                no description given
              </h2>
            </div>
          )}
        </div>
      </div>
    </section>

    /* <AnimatePresence mode="wait">
        <motion.div
          layout
          key={`${currentSelectedItem == null}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 50, duration: ".1" },
          }}
          exit={{ opacity: 0, scale: 0, transition: { duration: ".1" } }}
          className={SelectedItemCardStyles.resultsBar}
        >
          <motion.div
            layout
            className={`${SelectedItemCardStyles.noSelectionContainer} ${SelectedItemCardStyles.back}`}
          >
            <SelectedItemHeader
              title={
                currentSelectedItem == null ? "--" : currentSelectedItem.name
              }
              contributor={
                currentSelectedItem == null ? ["--"] : getContributor(type)
              }
            ></SelectedItemHeader>

            <TileSection item={currentSelectedItem} type={type}></TileSection>
            <div className={SelectedItemCardStyles.ListSectionContainer}>
              {type != ItemType.BOOKS ? (
                <DescriptionSection overflowAxis="horizontal">
                  <ListSection list={getContentList(type)}></ListSection>
                </DescriptionSection>
              ) : (
                ""
              )}
            </div>

            <DescriptionSection
              overflowAxis="vertical"
              setIsDescOverflowing={setIsDescOverflowing}
            >
              <div
                className={SelectedItemCardStyles.DescriptionContainer}
                style={{
                  width: "100%",
                }}
              >
                {currentSelectedItem != null &&
                currentSelectedItem.description != null
                  ? currentSelectedItem.description
                  : "no description"}
              </div>
            </DescriptionSection>
          </motion.div>
        </motion.div>
      </AnimatePresence> */
  );
};
