import React, { FunctionComponent, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import type { To } from "react-router";
import NavbarStyles from "./Navbar.module.css";

interface ILinkProps {
  to: To;
  children: ReactNode;
  props: any;
}
export const CustomLink: FunctionComponent<ILinkProps> = ({
  to,
  children,
  ...props
}) => {
  return (
    <li style={{ listStyle: "none" }}>
      <NavLink
        to={to}
        {...props}
        className={({ isActive }) => {
          return `
            ${NavbarStyles.navbutton} ${isActive ? NavbarStyles.active : ""}`;
        }}
      >
        {children}
      </NavLink>
    </li>
  );
};
