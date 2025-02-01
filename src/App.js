import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AnalyticsChart from './components/AnalyticsChart';
import EventTable from './components/EventTable';
import { fetchAnalyticsSummary } from './services/analyticsService';

const getPresetDateRange = (type) => {
  const today = new Date();
  let startDate, endDate;

  switch (type) {
    case 'last7days':
      startDate = new Date();
      startDate.setDate(today.getDate() - 7);
      endDate = today;
      break;
    case 'last30days':
      startDate = new Date();
      startDate.setDate(today.getDate() - 30);
      endDate = today;
      break;
    case 'thisMonth':
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = today;
      break;
    case 'lastYear':
      startDate = new Date(today.getFullYear() - 1, 0, 1);
      endDate = new Date(today.getFullYear() - 1, 11, 31);
      break;
    default:
      startDate = today;
      endDate = today;
  }

  return { startDate, endDate };
};

function App() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch analytics data
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

  // Fetch data on initial render & when dates change
  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  // Handle preset range selection
  const handlePresetClick = (type) => {
    const { startDate, endDate } = getPresetDateRange(type);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <div className="App">
      <h1>E-Commerce Analytics Dashboard</h1>

      {/* Preset Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => handlePresetClick('last7days')}>Last 7 Days</button>
        <button onClick={() => handlePresetClick('last30days')}>Last 30 Days</button>
        <button onClick={() => handlePresetClick('thisMonth')}>This Month</button>
        <button onClick={() => handlePresetClick('lastYear')}>Last Year</button>
      </div>

      {/* Custom Date Range Picker */}
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

      {/* Error Message */}
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
