import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: "rgba(255,255,255,0.9)",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "5px",
        fontFamily: "Arial, sans-serif"
      }}>
        <p style={{ margin: 0, fontWeight: "bold" }}>{label}</p>
        <p style={{ margin: 0 }}>{`Orders: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const OrderTrendsChart = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart 
          data={data} 
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.8}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
          <XAxis 
            dataKey="date" 
            tick={{ fontFamily: "Arial, sans-serif", fontSize: 12, fill: "#555" }} 
            stroke="#ccc"
          />
          <YAxis 
            tick={{ fontFamily: "Arial, sans-serif", fontSize: 12, fill: "#555" }} 
            stroke="#ccc"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontFamily: "Arial, sans-serif", fontSize: 12 }}/>
          <Bar dataKey="orders" fill="url(#colorOrders)" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderTrendsChart;
