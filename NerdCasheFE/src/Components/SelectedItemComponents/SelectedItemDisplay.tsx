import React, { FunctionComponent } from "react";
import SelectedItemCardStyles from "./SelectedItemDisplay.module.css";
import { DescriptionSection } from "./DescriptionSection";
import { useSelector } from "react-redux";
import { appState } from "../../Stores/appStore";
import { SelectedItemHeader } from "./SelectedItemHeader";
import { ItemType } from "../../Pages/ItemDisplay";
import {
  IBook,
  IMovie,
  IVideogame,
  itemType,
} from "../../Stores/reducers/ItemInterfaces";
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
  function getContributor(contentType: ItemType) {
    if (contentType == ItemType.GAMES)
      return (currentSelectedItem as IVideogame).companies;
    if (contentType == ItemType.MOVIES)
      return (currentSelectedItem as IMovie).directors;
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
  function getExtraContent(contentType: ItemType): JSX.Element[] {
    const content: JSX.Element[] = [];
    content.push(
      <div>
        <h3 className={SelectedItemCardStyles.header}>Rating</h3>
        <h2 className={SelectedItemCardStyles.container}>
          {currentSelectedItem.rating + "%"}
        </h2>
      </div>
    );
    if (contentType === ItemType.MOVIES) {
      content.push(
        <div>
          <h3 className={SelectedItemCardStyles.header}>Runtime</h3>
          <h2 className={SelectedItemCardStyles.container}>
            {(currentSelectedItem as IMovie).runtime + "m"}
          </h2>
        </div>
      );
    }
    if (contentType === ItemType.BOOKS) {
      content.push(
        <div>
          <h3 className={SelectedItemCardStyles.header}>Avg Pages</h3>
          <h2 className={SelectedItemCardStyles.container}>
            {(currentSelectedItem as IBook).num_pages}
          </h2>
        </div>
      );
      content.push(
        <div>
          <h3 className={SelectedItemCardStyles.header}>Editions</h3>
          <h2 className={SelectedItemCardStyles.container}>
            {(currentSelectedItem as IBook).num_editions}
          </h2>
        </div>
      );
    }
    return content;
  }
  function getFormattedDate(): React.ReactNode {
    const date = new Date(currentSelectedItem.release_date);
    return (
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
    );
  }

  function getContentType(type: ItemType): string {
    if (type == ItemType.GAMES) return "Platforms";
    if (type == ItemType.MOVIES) return "Actors";
    return "N/A";
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
              <SelectedItemHeader
                title={"Contributors"}
                items={getContributor(type)}
              ></SelectedItemHeader>
            </div>
            {type !== ItemType.BOOKS && (
              <div>
                <SelectedItemHeader
                  title={getContentType(type)}
                  items={getContentList(type)}
                ></SelectedItemHeader>
              </div>
            )}
            {getExtraContent(type).map((item) => {
              return item;
            })}
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
          {currentSelectedItem.description !== null ||
          currentSelectedItem.description !== undefined ? (
            <div style={{ height: "100%" }}>
              <DescriptionSection
                description={currentSelectedItem.description}
                overflowAxis="vertical"
              ></DescriptionSection>
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
  );
};
