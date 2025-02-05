import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportExcel = ({ events }) => {
  const exportToExcel = () => {
    if (!events || events.length === 0) {
      alert("No data available to export!");
      return;
    }

    // Convert JSON to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(events);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Events");

    // Create Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "Analytics_Report.xlsx");
  };

  return (
    <button onClick={exportToExcel} style={styles.button}>
      📥 Export to Excel
    </button>
  );
};

const styles = {
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px",
  },
};

export default ExportExcel;
