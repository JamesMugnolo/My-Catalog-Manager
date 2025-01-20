import React, { FunctionComponent } from "react";
import Modal from "@mui/material/Modal";

interface IModalProps {
  open: boolean;
  handleClose: ((event: unknown) => void) | undefined;
  children: any;
}
export const CustomModal: FunctionComponent<IModalProps> = ({
  open,
  handleClose,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        width: "100%",
        height: "100%",
        background: "rgba( 0, 0, 0, 0.3 )",
        boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
        backdropFilter: "blur( 28px )",
      }}
    >
      {children}
    </Modal>
  );
};
