import { useTheme } from "@mui/material";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const VertBarChart = ({chartData, title}) => {

    const theme = useTheme()
    const primary = theme.palette.primary.mainGraph;
    const secondary = theme.palette.primary.seconGraph;

    const keys = chartData === undefined || chartData == null ? [] : Object.keys(chartData)
    const formattedLabels =
      chartData === undefined || chartData == null
        ? []
        : keys.map((label) => label.substring(0, 11));
    const subLabels = chartData === undefined || chartData == null ? [] : Object.keys(chartData[keys[0]])

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: title,
          fontSize: 18,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          position: "bottom",
          maxRotation:
            title === "Proposed & Invoiced By Client" ||
            title === "Proposed & Invoiced By Client Child"
              ? 90
              : 0,
          minRotation:
            title === "Proposed & Invoiced By Client" ||
            title === "Proposed & Invoiced By Client Child"
              ? 90
              : 0,
        },
      },
    };

    let data = {
      labels: formattedLabels,
      datasets: [
        {
          label: subLabels[0],
          data: Object.values(chartData).map((obj) => obj[subLabels[0]]),
          backgroundColor: primary,
          barPercentage: 1,
        },
      ],
    };

    if(subLabels.length > 1) {
        data.datasets.push({
          label: subLabels[1],
          data: Object.values(chartData).map((obj) => obj[subLabels[1]]),
          backgroundColor: secondary,
          barPercentage: 1,
        });
    }

  return (
    <Bar options={options} data={data} width={300} height={300} />
  )
}

export default VertBarChart








