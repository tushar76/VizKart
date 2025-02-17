import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Fade,
  Backdrop,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const EmailReport = () => {
  const [open, setOpen] = useState(false);
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleSendEmail = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/send-email-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.text();
      alert(result);
      setOpen(false);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <div>
     
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ borderRadius: 2, fontWeight: "bold", textTransform: "none" }}
      >
        📧 Send Email Report
      </Button>

      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 450,
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 3,
              boxShadow: 24,
              backdropFilter: "blur(8px)",
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                Send Email Report
              </Typography>
              <IconButton onClick={() => setOpen(false)}>
                <Close />
              </IconButton>
            </Box>

            <TextField
              fullWidth
              label="Recipient Email"
              name="to"
              value={emailData.to}
              onChange={handleChange}
              margin="dense"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={emailData.subject}
              onChange={handleChange}
              margin="dense"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Message"
              name="body"
              value={emailData.body}
              onChange={handleChange}
              margin="dense"
              variant="outlined"
              multiline
              rows={4}
            />

            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button
                variant="contained"
                color="success"
                onClick={handleSendEmail}
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
              >
                Send Email
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setOpen(false)}
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default EmailReport;
