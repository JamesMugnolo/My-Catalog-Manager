import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import SelectedItemHeaderStyles from "./SelectedItemHeader.module.css";
import { ContentType, SingleLineContent } from "./SingleLineContent";
import { TextSlider } from "../ItemCard/TextSlider";
import { DropdownMenu } from "../ItemCard/DropdownMenu";
import useResizeObserver from "@react-hook/resize-observer";

interface ISelectedItemHeader {
  contributor: string[];
}

export const SelectedItemHeader: FunctionComponent<ISelectedItemHeader> = ({
  contributor,
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const [isContributorListExpanded, setIsContributorListExpanded] =
    useState(false);

  const [height, setHeight] = useState(0);

  useResizeObserver(divRef, (entry) => {
    if (!divRef || divRef.current == undefined || !entry) return;
    console.log(isContributorListExpanded);
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
            menuItems={contributor}
            dRef={divRef}
            setIsExpanded={setIsContributorListExpanded}
            isExpanded={isContributorListExpanded}
          ></DropdownMenu>
        </div>
      </div>
    </>
  );
};
