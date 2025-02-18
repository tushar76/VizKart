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
        sx={{
          borderRadius: 2,
          fontWeight: "bold",
          textTransform: "none",
          px: 3,
          py: 1.5,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
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
              width: 500,
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 3,
              boxShadow: 24,
              border: "1px solid #e0e0e0",
              background: "linear-gradient(135deg, #ffffff 0%, #f7f7f7 100%)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ color: "#333" }}>
                Send Email Report
              </Typography>
              <IconButton onClick={() => setOpen(false)} sx={{ color: "#666" }}>
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
              placeholder="e.g., user@example.com"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={emailData.subject}
              onChange={handleChange}
              margin="dense"
              variant="outlined"
              placeholder="e.g., Monthly Sales Report"
              sx={{ mb: 2 }}
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
              placeholder="e.g., Please find the attached report for this month..."
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleSendEmail}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                  px: 3,
                }}
              >
                Send Email
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setOpen(false)}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                  px: 3,
                }}
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

