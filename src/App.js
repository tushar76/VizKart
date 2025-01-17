import React, { useEffect, useState } from 'react';
import AnalyticsChart from './components/AnalyticsChart';
import EventTable from './components/EventTable';
import { fetchAnalyticsSummary } from './services/analyticsService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAnalyticsSummary();

        // Update chart and events data
        setAnalyticsData(data.chartData);
        setEvents(data.events);

        // Success toast notification
        toast.success(`Fetched ${data.events.length} new events!`, {
          position: "top-right", // Corrected position string
          autoClose: 3000,
        });
      } catch (error) {
        console.error("Error loading data", error);

        // Error toast notification
        toast.error("Failed to fetch analytics data.", {
          position: "top-right", // Corrected position string
          autoClose: 3000,
        });
      }
    };

    fetchData();

    // Set up periodic fetch for real-time updates
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="App">
      <h1>E-Commerce Analytics Dashboard</h1>
      <div>
        <h2>User Activity Chart</h2>
        <AnalyticsChart data={analyticsData} />
      </div>
      <div>
        <h2>Event Table</h2>
        <EventTable events={events} />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
