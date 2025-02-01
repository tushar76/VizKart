import React, { useEffect, useState, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { debounce } from 'lodash'; // Efficient API calls
import AnalyticsChart from './components/AnalyticsChart';
import EventTable from './components/EventTable';
import { fetchAnalyticsSummary } from './services/analyticsService';

const PRESETS = [
  { label: 'Last 7 Days', value: 'last7days' },
  { label: 'Last 30 Days', value: 'last30days' },
  { label: 'This Month', value: 'thisMonth' },
  { label: 'Last Year', value: 'lastYear' },
  { label: 'Custom Range', value: 'custom' },
];

const getPresetDateRange = (type) => {
  const today = new Date();
  let startDate, endDate;

  switch (type) {
    case 'last7days':
      startDate = new Date(today.setDate(today.getDate() - 7));
      break;
    case 'last30days':
      startDate = new Date(today.setDate(today.getDate() - 30));
      break;
    case 'thisMonth':
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      break;
    case 'lastYear':
      startDate = new Date(today.getFullYear() - 1, 0, 1);
      endDate = new Date(today.getFullYear() - 1, 11, 31);
      break;
    default:
      startDate = today;
  }

  return { startDate, endDate: endDate || new Date() };
};

function App() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [preset, setPreset] = useState('last7days');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounced API Fetch (Avoids unnecessary calls)
  const fetchData = useCallback(
    debounce(async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAnalyticsSummary(startDate, endDate);
        setAnalyticsData(data.chartData);
        setEvents(data.events);
      } catch (err) {
        setError('Failed to load analytics data.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    }, 500),
    [startDate, endDate]
  );

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  // Handle Preset Selection
  const handlePresetChange = (e) => {
    const selectedPreset = e.target.value;
    setPreset(selectedPreset);

    if (selectedPreset !== 'custom') {
      const { startDate, endDate } = getPresetDateRange(selectedPreset);
      setStartDate(startDate);
      setEndDate(endDate);
    }
  };

  return (
    <div className="App">
      <h1>E-Commerce Analytics Dashboard</h1>

      {/* Preset Filter Dropdown */}
      <label>Select Date Range:</label>
      <select value={preset} onChange={handlePresetChange}>
        {PRESETS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Custom Date Range Picker */}
      {preset === 'custom' && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <DatePicker selected={startDate} onChange={setStartDate} />
          <DatePicker selected={endDate} onChange={setEndDate} />
          <button onClick={fetchData} disabled={loading}>
            {loading ? 'Loading...' : 'Apply Filter'}
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Analytics Chart */}
      <div>
        <h2>User Activity Chart</h2>
        <AnalyticsChart data={analyticsData} />
      </div>

      {/* Event Table */}
      <div>
        <h2>Event Table</h2>
        <EventTable events={events} />
      </div>
    </div>
  );
}

export default App;
