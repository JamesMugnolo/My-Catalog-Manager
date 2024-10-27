import React, { FunctionComponent } from "react";
import { CustomLink } from "./CustomLink";
import { ItemType } from "../../Pages/ItemDisplay";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import NavContentStyles from "./NavContent.module.css";
interface INavbarContent {
  isMobileView: boolean;
}
export const NavbarContent: FunctionComponent<INavbarContent> = ({
  isMobileView,
}) => {
  return (
    <ul
      className={`${NavContentStyles.NavContentList} ${
        isMobileView ? NavContentStyles.Mobile : NavContentStyles.Desktop
      }`}
      style={{ flexDirection: isMobileView ? "column" : "row" }}
    >
      <CustomLink to={"/Games"} props={""} linkType={ItemType.GAMES}>
        Games
      </CustomLink>
      <CustomLink to={"/Books"} props={""} linkType={ItemType.BOOKS}>
        Books
      </CustomLink>
      <CustomLink to={"/Movies"} props={""} linkType={ItemType.MOVIES}>
        Movies
      </CustomLink>
      <CustomLink to={"/About"} props={""} linkType={ItemType.NONE}>
        About
      </CustomLink>
      <Button
        sx={{
          m: 0.5,
          height: "2.5rem",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
        color="error"
        variant="contained"
        className={NavContentStyles.signoutButton}
      >
        <Link
          to={"/SignOut"}
          className={NavContentStyles.signoutButtonText}
          style={{ fontSize: "22px", fontWeight: "900" }}
        >
          Sign Out
        </Link>
      </Button>
    </ul>
  );
};
