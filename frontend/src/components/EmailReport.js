import React from "react";

const EmailReport = () => {
  const sendEmail = () => {
    alert("Email report feature will be added soon!");
  };

  return (
    <button onClick={sendEmail} style={styles.button}>
      📧 Send Email Report
    </button>
  );
};

const styles = {
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginLeft: "10px",
  },
};

export default EmailReport;
