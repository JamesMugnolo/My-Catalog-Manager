import React, { FunctionComponent } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface IDynamicStyles {
  maxWidth: string;
  maxHeight: string;
}
interface IModalProps {
  open: boolean;
  handleClose:
    | ((event: unknown, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  title: string;
  children: any;
  styles: IDynamicStyles;
}
export const CustomModal: FunctionComponent<IModalProps> = ({
  open,
  handleClose,
  title,
  children,
  styles,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ width: "100%", height: "100%" }}
    >
      <div>
        <Box sx={styles}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h1"
            sx={{
              textAlign: "center",
              fontWeight: "50",
              fontSize: "2rem",
              fontFamily: "ui-sans-serif",
            }}
          >
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 0 }}>
            {children}
          </Typography>
        </Box>
      </div>
    </Modal>
  );
};
