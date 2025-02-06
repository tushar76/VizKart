
import React, { useState, useEffect } from "react";
import AnalyticsChart from "./components/AnalyticsChart";
import EventTable from "./components/EventTable";
import ExportExcel from "./components/ExportExcel";
import EmailReport from "./components/EmailReport";
import SkeletonLoader from "./components/SkeletonLoader";
import "./App.css";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3; // Maximum retry attempts

  useEffect(() => {
    const errorHandler = (error, errorInfo) => {
      console.error("Error in a component:", error, errorInfo);

      if (retryCount < maxRetries) {
        setRetryCount(retryCount + 1);
        setHasError(false); 
      } else {
        setHasError(true);
      }
    };

    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, [retryCount]);

  if (hasError) {
    return (
      <div className="error-container">
        <h2 className="error-message">Something went wrong. Please refresh.</h2>
        <button className="retry-button" onClick={() => setRetryCount(0)}>
          Retry
        </button>
      </div>
    );
  }

  return children;
};

const App = () => {
  const [events] = useState([
    { id: 1, description: "User logged in", timestamp: Date.now() },
  ]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
   
    setTimeout(() => {
      setLoading(false);
    }, 2000); 
  }, []);

  return (
    <ErrorBoundary>
      <div className="app-container">
        <h1 className="dashboard-title">E-Commerce Analytics Dashboard</h1>

        <div className="main-content">
          <div className="left-block">
            <div className="section">
              <h2 className="section-title">User Activity Chart</h2>
              <div className="chart-container">
                {loading ? (
                  <SkeletonLoader shape="rectangular" width="100%" height={300} />
                ) : (
                  <AnalyticsChart data={[{ label: "Jan", value: 100 }]} />
                )}
              </div>
            </div>
          </div>

          <div className="right-block">
            <div className="section">
              <h2 className="section-title">Event Table</h2>
              <div className="table-container">
                {loading ? (
                  <SkeletonLoader shape="table" width="100%" height={150} />
                ) : (
                  <EventTable events={events} />
                )}
              </div>
            </div>

            <div className="section">
              <h2 className="section-title">Export & Share</h2>
              <div className="export-container">
                {loading ? (
                  <SkeletonLoader shape="rectangular" width="100%" height={150} />
                ) : (
                  <>
                    <ExportExcel events={events} />
                    <EmailReport />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
