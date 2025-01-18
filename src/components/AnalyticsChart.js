import React from 'react';
import { Line } from 'react-chartjs-2';

const AnalyticsChart = ({ data = [] }) => {
  // Prepare chart data with defaults to avoid errors if `data` is undefined or empty
  const chartData = {
    labels: data.map((item) => item.label) || [],
    datasets: [
      {
        label: 'User Activity',
        data: data.map((item) => item.value) || [],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75,192,192,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
      },
    },
  };

  return (
    <div style={{ height: '400px', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      {data.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <p style={{ textAlign: 'center' }}>No data available to display.</p>
      )}
    </div>
  );
};

export default AnalyticsChart;
