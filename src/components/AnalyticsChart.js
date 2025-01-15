import React from 'react';
import { Line } from 'react-chartjs-2';

const AnalyticsChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.timestamp),
    datasets: [
      {
        label: 'User Activity Over Time',
        data: data.map(item => item.value),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        fill: true,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default AnalyticsChart;
