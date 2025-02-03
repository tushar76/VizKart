import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportExcel = ({ events }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(events);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Analytics Data");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    saveAs(blob, "analytics_report.xlsx");
  };

  return (
    <button onClick={exportToExcel} style={buttonStyle}>📊 Export Excel</button>
  );
};

const buttonStyle = {
  margin: "5px",
  padding: "10px 15px",
  background: "#28a745",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
};

export default ExportExcel;
