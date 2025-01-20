export const Styles = {
  field: {
    marginBottom: 0,
    padding: 0,
    display: "block",
    justifyContent: "center",
    "& .MuiInputBase-root": {
      borderBottom: "2px solid white",
      "& input": {
        color: "white",
        borderColor: "white",
        textAlign: "center",
      },
    },
    "& .MuiInputBase-root.Mui-focused": {
      borderBottom: "1px solid #1976d2",
    },
    "& label": {
      position: "relative",
      top: "25px",
      color: "white",
      textAlign: "center",
    },
    "& .MuiInputLabel-root": {
      width: "140%",
    },
    "& .MuiFormHelperText-root": {
      color: "white",
      textAlign: "center",
    },
    "& .MuiFormHelperText-root.Mui-focused": {
      color: "#1976d2",
    },
  },
};
