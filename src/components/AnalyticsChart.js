import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const AnalyticsChart = ({ data }) => {
 
  

  const chartData = useMemo(() => ({
    labels: data.map((item) => item.month), 
    datasets: [
      {
        label: "Monthly Sales", 
        data: data.map((item) => item.value),
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  }), [data]);
  
  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }), []);

  return (
    <div style={{ height: "400px",width: "600px", margin: "auto" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default AnalyticsChart;


