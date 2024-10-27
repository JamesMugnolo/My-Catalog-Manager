import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import DateCardStyles from "./DateCard.module.css";

interface IDateCard {
  release_date: Date | null;
}

export const DateCard: FunctionComponent<IDateCard> = ({ release_date }) => {
  const month = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  return (
    <div className={DateCardStyles.DateCardContainer}>
      {release_date == null ? (
        <h1 className={DateCardStyles.default}>--</h1>
      ) : (
        <>
          <h1 className={DateCardStyles.day}>{release_date.getDate()}</h1>
          <h1 className={DateCardStyles.month}>
            {month[release_date.getMonth()]}
          </h1>
          <h1 className={DateCardStyles.year}>{release_date.getFullYear()}</h1>
        </>
      )}
    </div>
  );
};
