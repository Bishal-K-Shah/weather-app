import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WeatherChart = ({ forecast }) => {
  // Get data for the next 24 hours (8 data points, every 3 hours)
  const chartData = forecast.list.slice(0, 8);

  const labels = chartData.map(item => {
    const date = new Date(item.dt * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  });

  const temperatures = chartData.map(item => Math.round(item.main.temp));
  const feelsLike = chartData.map(item => Math.round(item.main.feels_like));
  const humidity = chartData.map(item => item.main.humidity);

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatures,
        borderColor: 'rgb(255, 107, 107)',
        backgroundColor: 'rgba(255, 107, 107, 0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgb(255, 107, 107)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        borderWidth: 3,
      },
      {
        label: 'Feels Like (°C)',
        data: feelsLike,
        borderColor: 'rgb(78, 205, 255)',
        backgroundColor: 'rgba(78, 205, 255, 0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgb(78, 205, 255)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        borderWidth: 3,
      },
      {
        label: 'Humidity (%)',
        data: humidity,
        borderColor: 'rgb(120, 255, 214)',
        backgroundColor: 'rgba(120, 255, 214, 0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgb(120, 255, 214)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        borderWidth: 3,
        yAxisID: 'y1',
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          color: '#ffffff'
        }
      },
      title: {
        display: true,
        text: '24-Hour Weather Forecast',
        font: {
          size: 18,
          weight: 'bold',
          family: "'Inter', sans-serif"
        },
        padding: 20,
        color: '#ffffff'
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        padding: 12,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        },
        cornerRadius: 8,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Temperature (°C)',
          font: {
            size: 12,
            weight: 'bold'
          },
          color: '#ffffff'
        },
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.15)'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Humidity (%)',
          font: {
            size: 12,
            weight: 'bold'
          },
          color: '#ffffff'
        },
        ticks: {
          color: '#ffffff'
        },
        grid: {
          drawOnChartArea: false,
        },
        max: 100,
        min: 0
      },
      x: {
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.15)'
        }
      }
    },
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default WeatherChart;
