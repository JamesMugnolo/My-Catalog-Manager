import { Margin } from "@mui/icons-material";

export const ButtonStyles = {
  selected: {
    "&.Mui-disabled": {
      background: "  ",
      color: "white",
      fontWeight: "bold",
      boxShadow:
        "rgba(0, 0, 0, 0.3) 0px 19px 38px,rgba(0, 0, 0, 0.22) 0px 15px 12px",
    },
  },
  unselected: {
    background: "rgba(255,255,255,.10)",
    color: "#c0c0c0",
  },
  button: {
    fontSize: "120%",
    borderRadius: "10px",
    paddingTop: ".5rem",
    paddingBottom: ".5rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    marginRight: " 2rem",
    boxShadow: "none",
    height: "fit-content",
    margin: 0,
    "@media (min-width: 768px)": {
      fontSize: "100%",
    },
  },
};
