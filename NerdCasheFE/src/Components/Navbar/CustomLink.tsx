import React, { FunctionComponent, ReactNode } from "react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import type { To } from "react-router";
import NavbarStyles from "./Navbar.module.css";
import { useDispatch } from "react-redux";
import { useItemAPI } from "../../Hooks/useItemAPI";
import { ItemType } from "../../Pages/ItemDisplay";
import { itemType } from "../../Stores/reducers/ItemInterfaces";

interface ILinkProps {
  to: To;
  children: ReactNode;
  linkType: ItemType;
  props: any;
}
export const CustomLink: FunctionComponent<ILinkProps> = ({
  to,
  children,
  linkType,
  ...props
}) => {
  //gets the full absolute path
  const fullPath = useResolvedPath(to);

  const dispatch = useDispatch();
  const { fetchUserItems } = useItemAPI(linkType);

  const HandleClick = async () => {
    if (isActive != true) {
      dispatch({ type: "CHANGE_ITEM_COLLECTON" });

      if (linkType != ItemType.NONE) {
        const userGames: itemType[] = await fetchUserItems();
        dispatch({
          type: "ADD_USER_ITEMS",
          newItems: userGames,
        });
      }
    }
  };
  const isActive = useMatch({ path: fullPath.pathname, end: true })?.pattern
    .end;
  return (
    <li style={{ listStyle: "none" }}>
      <NavLink
        to={to}
        {...props}
        className={({ isActive }) => {
          return `
            ${NavbarStyles.navbutton} ${isActive ? NavbarStyles.active : ""}`;
        }}
        onClick={HandleClick}
      >
        {children}
      </NavLink>
    </li>
  );
};
