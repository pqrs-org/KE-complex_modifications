import React, { useContext } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { JsonModalContext } from "../contexts";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const JsonModal = () => {
  const jsonModalContext = useContext(JsonModalContext);

  const handleClose = () => {
    jsonModalContext.setOpen(false);
  };

  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={jsonModalContext.fetching}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Modal
        open={jsonModalContext.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box> {jsonModalContext.title}</Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              minHeight: "100px",
              maxHeight: "calc(90vh - 40px)",
              overflow: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {jsonModalContext.jsonString}
          </Typography>
        </Box>
      </Modal>
    </React.Fragment>
  );
};
