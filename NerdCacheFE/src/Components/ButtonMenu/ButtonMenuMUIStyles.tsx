import { BorderBottom, Height, Scale } from "@mui/icons-material";
import { fontSize } from "@mui/system";

export const SelectStyles = {
  selectBtn: {
    height: "100%",
    color: "black",
    backgroundColor: "#1976d2",
    borderRadius: "10px",
    BorderBottom: "none",
    ":hover": {
      backgroundColor: "#1976d2",
      ":not(.Mui-disabled, .Mui-error)": {
        ":before": { borderBottom: "none" },
      },
    },
    ":focus": {},
    "::before": {
      borderBottom: "none",
      color: "white",
    },
    "::after": {
      borderBottom: "none",
      color: "white",
    },
    ":before": {
      borderBottom: "none",
    },
    "& .MuiInputBase": {
      Height: "100%",
      fontSize: "1rem",
      ":before": {
        borderBottom: "none",
      },
    },
    "& .MuiSelect-icon": {
      color: "black",
      fontSize: "2rem",
    },
    "@media (min-width: 300px)": {
      "& .MuiFilledInput-input": {
        paddingBottom: "0px",
        paddingTop: "0px",
        borderBottom: "none",
        height: "fit-content",
      },
      border: "none",
      backgroundColor: "#1976d2",
      fontSize: ".85rem",
      borderRadius: "5px",
      paddingBottom: "0px",
      paddingTop: "0px",
      "& .MuiInputBase-root:hover:not(.Mui-disabled,.Mui-error):before": {
        borderBottom: "none",
      },
      "& .MuiInputBase-root.MuiFilledInput-root.MuiSelect-root": {
        "::hover": {
          "::not(.Mui-disabled, .Mui-error)": {
            "::before": {
              borderBottom: "none",
            },
          },
        },
      },
    },
  },
  label: {
    color: "white",
    fontWeight: "bolder",
    fontSize: "1rem",
    "&.Mui-focused": {
      color: "white",
    },
    "@media (min-width: 300px)": {
      fontSize: ".75rem",
      borderRadius: "5px",
    },
  },
};
