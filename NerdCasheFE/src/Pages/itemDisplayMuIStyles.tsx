export const SearchStyle = {
  field: {
    "& .MuiInputBase-root": {
      height: "100%",
      background: "white",
      border: "none",
      "&:-webkit-autofill": {
        WebkitBoxShadow: "none",
        boxShadow: "none",
      },
      "& input": {
        color: "black",
        padding: "0px",
        paddingLeft: "1%",
        borderRadious: "5px",
        background: "white",
        fontSize: "calc(1rem + 1vw)",
        border: "none",
        "&::placeholder": {
          textOverflow: "ellipsis !important",
          color: "black",
        },
        "&:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 30px white inset !important;",
          boxShadow: "none",
        },
        "&:-webkit-autofill:active": {
          WebkitBoxShadow: "0 0 0 30px white inset !important;",
          boxShadow: "none",
        },
        "&:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 30px white inset !important;",
          boxShadow: "none",
        },
        "&:-webkit-autofill:hover": {
          WebkitBoxShadow: "0 0 0 30px white inset !important;",
          boxShadow: "none",
        },
      },
      "& .MuiTextField-root": {
        background: "white",
      },
      "& .MuiOutlinedInput-input": {
        height: "fit-content",
        "&:-webkit-autofill": {
          WebkitTextFillColor: "default",
          background: "white",
          WebkitBoxShadow: "none",
          boxShadow: "none",
        },
        "&:-webkit-autofill:focus": {
          fontSize: "2.43em !important",
          background: "white",
        },
        "&:-webkit-autofill-selected": {
          fontSize: "2.43em !important",
          backgroundColor: "white",
        },
        "@media (max-width: 768px)": {
          "&:-webkit-autofill:focus": {
            fontSize: "1.43em !important",
          },
        },
      },
      "& fieldset": {
        border: "none",
        paddingLeft: "2%",
        background: "none",
      },
    },
  },
};
