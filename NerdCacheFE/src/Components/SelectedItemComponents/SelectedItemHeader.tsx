import React, { FunctionComponent, useRef, useState } from "react";
import SelectedItemHeaderStyles from "./SelectedItemHeader.module.css";
import { DropdownMenu } from "./DropdownMenu";
import useResizeObserver from "@react-hook/resize-observer";

interface ISelectedItemHeader {
  title: string;
  items: string[];
}

export const SelectedItemHeader: FunctionComponent<ISelectedItemHeader> = ({
  title,
  items,
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const [isContributorListExpanded, setIsContributorListExpanded] =
    useState(false);

  const [height, setHeight] = useState(0);

  useResizeObserver(divRef, (entry) => {
    if (!divRef || divRef.current == undefined || !entry) return;
    if (!isContributorListExpanded) {
      setHeight(divRef.current.clientHeight);
    }
  });
  return (
    <>
      <div className={SelectedItemHeaderStyles.headerContainer}>
        <div
          className={SelectedItemHeaderStyles.contributorContainer}
          style={{
            height: height,
            minHeight: height,
          }}
        >
          <DropdownMenu
            menuItems={items}
            title={title}
            dRef={divRef}
            setIsExpanded={setIsContributorListExpanded}
            isExpanded={isContributorListExpanded}
          ></DropdownMenu>
        </div>
      </div>
    </>
  );
};
