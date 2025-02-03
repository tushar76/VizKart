import React, { useEffect, useState } from "react";
import AnalyticsChart from "./components/AnalyticsChart";
import EventTable from "./components/EventTable";
import ExportExcel from "./components/ExportExcel";
import EmailReport from "./components/EmailReport"; // ✅ Import here
import { fetchAnalyticsSummary } from "./services/analyticsService";

function App() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
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
      <h1>E-Commerce Analytics Dashboard</h1>

      {/* 📊 User Activity Chart */}
      <div>
        <h2>User Activity</h2>
        <AnalyticsChart data={analyticsData} />
      </div>

      {/* 📋 Event Table */}
      <div>
        <h2>Event Log</h2>
        <EventTable events={events} />
      </div>

      {/* 📤 Export & Email Report */}
      <div style={{ marginTop: "20px" }}>
        <h2>Export & Share</h2>
        <ExportExcel events={events} /> {/* ✅ Export to Excel */}
        <EmailReport /> {/* ✅ Send Report via Email */}
      </div>
    </div>
  );
}

export default App;
