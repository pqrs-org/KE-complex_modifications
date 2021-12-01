import React, { useContext } from "react";
import { Snackbar as MuiSnackbar } from "@mui/material";
import { SnackbarContext } from "../contexts";

export const Snackbar = () => {
  const snackbarContext = useContext(SnackbarContext);

  return (
    <MuiSnackbar
      open={snackbarContext.text !== ""}
      autoHideDuration={3000}
      onClose={(_event, reason) => {
        if (reason === "clickaway") {
          return;
        }

        snackbarContext.setText("");
      }}
      message={snackbarContext.text}
    />
  );
};
