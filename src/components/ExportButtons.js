import React from "react";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ExportButtons = ({ events }) => {
  const exportCSV = () => {
    const headers = "Event ID,Description,Timestamp\n";
    const csvData = events
      .map((event) => `${event.id},${event.description},${new Date(event.timestamp).toLocaleString()}`)
      .join("\n");

    const blob = new Blob([headers + csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "analytics_report.csv");
  };

 
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Analytics Report", 20, 10);

    const tableData = events.map((event) => [
      event.id,
      event.description,
      new Date(event.timestamp).toLocaleString(),
    ]);

    doc.autoTable({
      head: [["Event ID", "Description", "Timestamp"]],
      body: tableData,
    });

    doc.save("analytics_report.pdf");
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <button onClick={exportCSV} style={buttonStyle}>📄 Export CSV</button>
      <button onClick={exportPDF} style={buttonStyle}>📜 Export PDF</button>
    </div>
  );
};

const buttonStyle = {
  margin: "5px",
  padding: "10px 15px",
  background: "#007bff",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
};

export default ExportButtons;
