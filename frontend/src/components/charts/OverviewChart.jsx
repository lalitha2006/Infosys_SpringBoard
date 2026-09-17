import { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Cell,
} from "recharts";

import { getDashboardStats } from "../../services/dashboardService";

function OverviewChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    try {
      const stats = await getDashboardStats();

      setChartData([
        {
          category: "Running",
          count: stats.runningAssets,
          color: "#1976D2",
        },
        {
          category: "Healthy",
          count: stats.healthyAssets,
          color: "#2E7D32",
        },
        {
          category: "Warning",
          count: stats.warningAssets,
          color: "#F9A825",
        },
        {
          category: "Critical",
          count: stats.criticalAssets,
          color: "#D32F2F",
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
        height: 430,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}
      >
        Infrastructure Health
      </Typography>

      <ResponsiveContainer width="100%" height="88%">
        <BarChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            opacity={0.25}
          />

          <XAxis dataKey="category" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="count"
            radius={[10, 10, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.color}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default OverviewChart;