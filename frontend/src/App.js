import React, { useState, useEffect } from "react";
import AnalyticsChart from "./components/AnalyticsChart";
import OrderTrendsChart from "./components/OrderTrendsChart";
import EventTable from "./components/EventTable";
import ExportExcel from "./components/ExportExcel";
import EmailReport from "./components/EmailReport";
import SkeletonLoader from "./components/SkeletonLoader";
import UserStatistics from "./components/UserStatistics";
import "./App.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 7;

  useEffect(() => {
    const errorHandler = (error) => {
      console.error("Error in a component:", error);
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
  const [events, setEvents] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [orderTrends, setOrderTrends] = useState([]);
  const [userStats, setUserStats] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events`);
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchChartData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/chart-data`);
        if (!response.ok) throw new Error("Failed to fetch chart data");
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    const fetchOrderTrends = async () => {
      try {
        const response = await fetch(`${API_URL}/api/order-trends`);
        if (!response.ok) throw new Error("Failed to fetch order trends");
        const data = await response.json();
        setOrderTrends(data);
      } catch (error) {
        console.error("Error fetching order trends:", error);
      }
    };

    const fetchUserStatistics = async () => {
      try {
        const response = await fetch(`${API_URL}/api/user-statistics`);
        if (!response.ok) throw new Error("Failed to fetch user statistics");
        const data = await response.json();
        setUserStats(data[0]);
      } catch (error) {
        console.error("Error fetching user statistics:", error);
      }
    };

    fetchEvents();
    fetchChartData();
    fetchOrderTrends();
    fetchUserStatistics();
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
                {chartData.length === 0 ? (
                  <SkeletonLoader shape="rectangular" width="100%" height={400} />
                ) : (
                  <AnalyticsChart data={chartData} />
                )}
              </div>
            </div>
            <div className="section">
              <h2 className="section-title">Order Trends</h2>
              <div className="chart-container">
                {orderTrends.length === 0 ? (
                  <SkeletonLoader shape="rectangular" width="100%" height={300} />
                ) : (
                  <OrderTrendsChart data={orderTrends} />
                )}
              </div>
            </div>
          </div>
          <div className="right-block">
            <div className="section">
              <h2 className="section-title">User Statistics</h2>
              <div className="stats-container">
                {Object.keys(userStats).length === 0 ? (
                  <SkeletonLoader shape="rectangular" width="100%" height={200} />
                ) : (
                  <UserStatistics stats={userStats} />
                )}
              </div>
            </div>
            <div className="section">
              <h2 className="section-title">Event Table</h2>
              <div className="table-container">
                {events.length === 0 ? (
                  <SkeletonLoader shape="table" width="100%" height={150} />
                ) : (
                  <EventTable events={events} />
                )}
              </div>
            </div>
            <div className="section">
              <h2 className="section-title">Export & Share</h2>
              <div className="export-container">
                {events.length === 0 ? (
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

