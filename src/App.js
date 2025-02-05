
import React, { useState, useEffect } from "react";
import AnalyticsChart from "./components/AnalyticsChart";
import EventTable from "./components/EventTable";
import ExportExcel from "./components/ExportExcel";
import EmailReport from "./components/EmailReport";
import "./App.css";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error, errorInfo) => {
      console.error("Error in a component:", error, errorInfo);
      setHasError(true);
    };

    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  if (hasError) {
    return <h2 className="error-message">Something went wrong. Please refresh.</h2>;
  }
  return children;
};

const App = () => {
  const [events] = useState([
    { id: 1, description: "User logged in", timestamp: Date.now() },
  ]);

  return (
    <ErrorBoundary>
      <div className="app-container">
  <h1 className="dashboard-title">E-Commerce Analytics Dashboard</h1>

  <div className="main-content">
    <div className="left-block">
      <div className="section">
        <h2 className="section-title">User Activity Chart</h2>
        <div className="chart-container">
          <AnalyticsChart data={[{ label: "Jan", value: 100 }]} />
        </div>
      </div>
    </div>

    <div className="right-block">
      <div className="section">
        <h2 className="section-title">Event Table</h2>
        <div className="table-container">
          <EventTable events={events} />
        </div>
      </div>

    

      <div className="section">
        <h2 className="section-title">Export & Share</h2>
        <div className="export-container">
          <ExportExcel events={events} />
          <EmailReport />
        </div>
      </div>
    </div>
  </div>
</div>

     
    </ErrorBoundary>
  );
};

export default App;