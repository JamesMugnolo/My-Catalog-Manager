import React, { FunctionComponent, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
interface ISFLProps {
  labelText: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const VisibilityLabel: FunctionComponent<ISFLProps> = ({
  labelText,
  isVisible,
  setIsVisible,
}) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>{labelText}</p>
      {isVisible ? (
        <VisibilityIcon
          sx={{ fontSize: "20px", marginLeft: ".5rem" }}
          onClick={(e) => setIsVisible(!isVisible)}
        ></VisibilityIcon>
      ) : (
        <VisibilityOffIcon
          sx={{
            fontSize: "20px",
            marginLeft: ".5rem",
            "&:hover": { cursor: "pointer" },
          }}
          onClick={(e) => setIsVisible(!isVisible)}
        ></VisibilityOffIcon>
      )}
    </div>
  );
};
