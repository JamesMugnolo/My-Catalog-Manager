import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import SelectedItemReviewCardStyles from "./StatCard.module.css";

interface ISelectedItemReveiwCard {
  stat: string;
  header: string;
  subHeader?: string;
}
export const StatCard: FunctionComponent<ISelectedItemReveiwCard> = ({
  stat,
  header,
  subHeader,
}) => {
  return (
    <div className={SelectedItemReviewCardStyles.statCard}>
      <div className={SelectedItemReviewCardStyles.statContent}>
        <h3>{subHeader}</h3>
        <h2>{stat}</h2>
      </div>
    </div>
  );
};
