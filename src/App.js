import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AnalyticsChart from './components/AnalyticsChart';
import EventTable from './components/EventTable';
import { fetchAnalyticsSummary } from './services/analyticsService';

function App() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState(new Date()); // Default: Today
  const [endDate, setEndDate] = useState(new Date()); // Default: Today
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAnalyticsSummary(startDate, endDate);
      setAnalyticsData(data.chartData);
      setEvents(data.events);
    } catch (err) {
      setError("Failed to load analytics data.");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  return (
    <div className="App">
      <h1>E-Commerce Analytics Dashboard</h1>

    
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <div>
          <label>Start Date:</label>
          <DatePicker selected={startDate} onChange={setStartDate} />
        </div>
        <div>
          <label>End Date:</label>
          <DatePicker selected={endDate} onChange={setEndDate} />
        </div>
        <button onClick={fetchData} disabled={loading}>
          {loading ? 'Loading...' : 'Apply Filter'}
        </button>
      </div>

      
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
