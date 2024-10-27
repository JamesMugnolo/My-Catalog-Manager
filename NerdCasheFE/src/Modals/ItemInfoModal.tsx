import React, {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import TextFeild from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useForm from "react-hook-form";
import { CustomModal } from "./CustomModal";
import { Styles } from "./FormStyling";
import { VisibilityLabel } from "./VisibilityLabel";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useUserAPI } from "../Hooks/useUserAPI";
import { itemType } from "../Stores/reducers/ItemInterfaces";
import { SelectedGameCard } from "../Components/SelectedItemComponents/SelectedItemDisplay";
import { ItemType } from "../Pages/ItemDisplay";
import { ItemInfoModalStyles } from "./ModalStyles";
interface IItemInfoModalProps {
  type: ItemType;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ItemInfoModal: FunctionComponent<IItemInfoModalProps> = ({
  type,
  isModalOpen,
  setIsModalOpen,
}) => {
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <CustomModal
      open={isModalOpen}
      handleClose={closeModal}
      title={""}
      styles={ItemInfoModalStyles}
    >
      <SelectedGameCard type={type} closeModal={closeModal}></SelectedGameCard>
    </CustomModal>
  );
};
