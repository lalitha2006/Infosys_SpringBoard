import { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
 Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getDashboardStats } from "../../services/dashboardService";

const COLORS = [
  "#00C853",
  "#1976D2",
  "#FFC107",
  "#D32F2F",
];

function AssetDistributionChart() {

  const [data, setData] = useState([]);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    try {
      const stats = await getDashboardStats();
      setData(stats.assetDistribution);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 5, height: 420 }}>

      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}
      >
        Asset Distribution
      </Typography>

      <ResponsiveContainer width="100%" height="90%">

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            innerRadius={75}
            outerRadius={115}
            paddingAngle={5}
          >

            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </Paper>
  );
}

export default AssetDistributionChart;