// TideChart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TideChart = () => {
  const [tideData, setTideData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTideData = async () => {
      try {
        const response = await axios.get('/api/tides/oslo');
        setTideData(response.data.surgeData || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTideData();
  }, []);

  useEffect(() => {
    // Cleanup chart instance when component unmounts or data changes
    return () => {
      if (window.myChart) {
        window.myChart.destroy();
      }
    };
  }, [tideData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching tide data</div>;

  const chartData = {
    labels: tideData.map(data => `${data.hour}:${data.minute}`),
    datasets: [
      {
        label: 'Surge',
        data: tideData.map(data => data.surge),
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Tide',
        data: tideData.map(data => data.tide),
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'Total',
        data: tideData.map(data => data.total),
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
