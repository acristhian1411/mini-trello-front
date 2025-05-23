import React from "react";
import {
  Modal,
  Box,
  IconButton,
  Fade,
  Backdrop
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function MidModal({ children, open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 300 }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
            maxHeight: '90vh',
            overflowY: 'auto',
            width: 'auto',
            minWidth: 300
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
}
