import React, { useEffect, useState } from 'react';
import AnalyticsChart from './components/AnalyticsChart';
import EventTable from './components/EventTable';
import { fetchAnalyticsSummary } from './services/analyticsService';

function App() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch analytics summary from the backend
    const fetchData = async () => {
      try {
        const data = await fetchAnalyticsSummary();
        setAnalyticsData(data.chartData);
        setEvents(data.events);
      } catch (error) {
        console.error("Error loading data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>VizKart - ECommerce Analytics Dashboard</h1>
      <div>
        <h2>User Activity Chart</h2>
        <AnalyticsChart data={analyticsData} />
      </div>
      <div>
        <h2>Event Table</h2>
        <EventTable events={events} />
      </div>
    </div>
  );
}

export default App;
