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

       
        setAnalyticsData(data.chartData);
        setEvents(data.events);

        
        toast.success(`Fetched ${data.events.length} new events!`, {
          position: "top-right", 
          autoClose: 3000,
        });
      } catch (error) {
        console.error("Error loading data", error);

      
        toast.error("Failed to fetch analytics data.", {
          position: "top-right", 
          autoClose: 3000,
        });
      }
    };

    fetchData();

    
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval); 
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
