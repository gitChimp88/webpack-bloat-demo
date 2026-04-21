import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
  DoughnutController,
  LineController,
  RadarController,
  BarController,
} from "chart.js";
import { Line, Bar, Doughnut, Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  ChartTooltip,
  Legend,
  Filler,
  DoughnutController,
  LineController,
  RadarController,
  BarController,
);

const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [12000, 19000, 3000, 5000, 22000, 30000],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
    },
  ],
};

const categoryData = {
  labels: ["Electronics", "Clothing", "Food", "Books", "Toys"],
  datasets: [
    {
      data: [300, 150, 200, 80, 120],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
    },
  ],
};

export default function ChartsTab({ formattedData }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Revenue Over Time</Typography>
          <Line data={formattedData || salesData} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Category Breakdown</Typography>
          <Doughnut data={categoryData} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Bar Chart</Typography>
          <Bar data={salesData} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Radar</Typography>
          <Radar
            data={{
              labels: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
              datasets: [{ label: "Score", data: [65, 85, 70, 90, 75], fill: true }],
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
