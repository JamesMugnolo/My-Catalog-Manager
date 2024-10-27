import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import ListSectionStyles from "./ListSection.module.css";
interface IListSection {
  list: Array<string> | null;
}
export const ListSection: FunctionComponent<IListSection> = ({ list }) => {
  return (
    <div className={ListSectionStyles.sectionContianer}>
      <div className={ListSectionStyles.listContainer}>
        {list == null
          ? ""
          : list.map((listItem) => {
              return (
                <div
                  key={listItem}
                  className={ListSectionStyles.ListItemContent}
                >
                  <h1>{listItem}</h1>
                </div>
              );
            })}
      </div>
    </div>
  );
};
