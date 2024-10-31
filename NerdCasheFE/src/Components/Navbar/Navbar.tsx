import React, { FunctionComponent, useState } from "react";
import NavbarStyles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Sidebar } from "./sidebar";
import { NavbarContent } from "./NavContent";
import { AnimatePresence } from "framer-motion";
import { useMediaQuery } from "../../Hooks/useMediaQuery";

export const Navbar: FunctionComponent = () => {
  const { isMobileView } = useMediaQuery();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function HandleClick(): void {
    setIsMenuOpen(true);
    console.log("clicked");
  }

  return (
    <>
      <AnimatePresence>
        {isMobileView ? (
          <Sidebar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        ) : (
          ""
        )}
      </AnimatePresence>
      <nav className={NavbarStyles.nav}>
        <div className={NavbarStyles.siteTitleContainer}>
          <Link
            to={"/"}
            className={NavbarStyles.siteTitle}
            style={{ fontSize: "26px" }}
          >
            Nerd Cashe
          </Link>
        </div>
        {isMobileView ? (
          <button
            className={NavbarStyles.MobileMenu}
            onClick={(e) => HandleClick()}
          >
            <MenuIcon></MenuIcon>
          </button>
        ) : (
          <NavbarContent isMobileView={false}></NavbarContent>
        )}
      </nav>
    </>
  );
};
