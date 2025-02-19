import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "@mui/material";

const ExportExcel = ({ events }) => {
  const exportToExcel = () => {
    if (!events || events.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(events);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Analytics Data");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob(
      [excelBuffer],
      { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
    );
    saveAs(blob, "Analytics_Report.xlsx");
  };

  return (
    <Button
      onClick={exportToExcel}
      disabled={!events || events.length === 0}
      sx={{
        borderRadius: 2,
        fontWeight: "bold",
        textTransform: "none",
        px: 3,
        py: 1.5,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        marginTop: 2,
        backgroundColor: "#28a745",
        color: "#fff",
        "&:hover": {
          backgroundColor: "orange[500]",
        },
      }}
    >
      📊 Export to Excel
    </Button>
  );
};

export default ExportExcel;

