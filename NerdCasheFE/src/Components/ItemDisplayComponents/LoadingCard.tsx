import React, { FunctionComponent, useEffect, useState } from "react";
import LoadingCardStyles from "./LoadingCard.module.css";

export const LoadingCard: FunctionComponent = () => {
  return (
    <section className={LoadingCardStyles.LoadingSection}>
      <div className={LoadingCardStyles.LoadingWheelContainer}>
        <div className={LoadingCardStyles.LoadingWheel}></div>
      </div>
      <div className={LoadingCardStyles.HeaderContainer}></div>
    </section>
  );
};
