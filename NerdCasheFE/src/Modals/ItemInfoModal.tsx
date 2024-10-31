import React, { FunctionComponent } from "react";
import { CustomModal } from "./CustomModal";
import { SelectedGameCard } from "../Components/SelectedItemComponents/SelectedItemDisplay";
import { ItemType } from "../Pages/ItemDisplay";

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
    <CustomModal open={isModalOpen} handleClose={closeModal}>
      <SelectedGameCard type={type} closeModal={closeModal}></SelectedGameCard>
    </CustomModal>
  );
};
