import React, { useEffect, useState } from 'react';
import AnalyticsChart from './components/AnalyticsChart';
import EventTable from './components/EventTable';
import { fetchAnalyticsSummary } from './services/analyticsService';

function App() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null); 
    try {
      const data = await fetchAnalyticsSummary();
      setAnalyticsData(data.chartData);
      setEvents(data.events);
    } catch (err) {
      setError("Failed to load analytics data. Please try again.");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>E-Commerce Analytics Dashboard</h1>

      <button
        onClick={fetchData}
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        disabled={loading} 
      >
        {loading ? 'Refreshing...' : 'Refresh Data'}
      </button>

     
      {error && <p style={{ color: 'red' }}>{error}</p>}

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
