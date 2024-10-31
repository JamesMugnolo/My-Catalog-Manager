import React, { FunctionComponent } from "react";
import SidebarStyles from "./sidebar.module.css";
import { NavbarContent } from "./NavContent";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "../../Hooks/useMediaQuery";

interface ISidebarProps {
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
}
export const Sidebar: FunctionComponent<ISidebarProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { isMobileView } = useMediaQuery();
  function closeSidebar() {
    setIsOpen(false);
  }
  return (
    <>
      {!isMobileView ? closeSidebar() : null}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={SidebarStyles.SidebarContainer}
            onFocus={(e) => e.stopPropagation()}
            onClick={closeSidebar}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0" }}
              exit={{ x: "100%" }}
              className={`${SidebarStyles.Sidebar} ${
                isOpen
                  ? SidebarStyles.SidebarVisable
                  : SidebarStyles.SidebarHidden
              }`}
              onClick={closeSidebar}
            >
              <h1 className={SidebarStyles.Title}>Nerd Cashe</h1>
              <NavbarContent isMobileView={true}></NavbarContent>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
