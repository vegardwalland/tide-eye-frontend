// src/components/TideChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TideChart = ({ tideData }) => {
  if (!tideData) return <div>No data available</div>;

  // Construct labels and dataset from the fetched tide data
  const chartLabels = tideData.tideData.surgeData.map(data => `${data.year}-${data.month}-${data.day} ${data.hour}:00`);
  const surgeData = tideData.tideData.surgeData.map(data => data.surge);
  const tideDataValues = tideData.tideData.surgeData.map(data => data.tide);
  const totalData = tideData.tideData.surgeData.map(data => data.total);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Surge',
        data: surgeData,
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Tide',
        data: tideDataValues,
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'Total',
        data: totalData,
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default TideChart;
