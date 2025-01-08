import React from 'react';
import { Line } from 'react-chartjs-2';
import { PointElement, CategoryScale, Chart, LinearScale, LineElement } from 'chart.js';

// Register the required components
Chart.register(PointElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(LineElement);

const Graph = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Data',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: '#80509F', // Line color
        backgroundColor: 'rgba(128, 80, 159, 0.2)', // Gradient color
        pointBackgroundColor: '#80509F', // Point color
        pointBorderColor: '#80509F', // Point border color
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        grid: {
          color: '#80509F', // X axis color
        },
      },
      y: {
        grid: {
          color: '#80509F', // Y axis color
        },
      },
    },
  };    

  return (
    <div>
      <h2>Line Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default Graph;
