import {
  Paper,
  Typography,
  Box,
  Chip,
  Stack,
} from "@mui/material";

import WavingHandIcon from "@mui/icons-material/WavingHand";
import ComputerIcon from "@mui/icons-material/Computer";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/dashboardService";

function WelcomeBanner() {
  const [stats, setStats] = useState({
    totalAssets: 0,
    runningAssets: 0,
    healthyAssets: 0,
    warningAssets: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 5,
        p: 4,
        mb: 3,
        background:
          "linear-gradient(135deg,#0F172A,#1E293B)",
        color: "white",
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
      >
        {greeting}, Mohith{" "}
        <WavingHandIcon sx={{ color: "#FFC107" }} />
      </Typography>

      <Typography
        sx={{
          mt: 1,
          color: "rgba(255,255,255,.75)",
        }}
      >
        Monitor, analyze and secure your infrastructure from one
        unified dashboard.
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        mt={4}
        flexWrap="wrap"
        useFlexGap
      >
        <Chip
          icon={<ComputerIcon />}
          label={`Assets : ${stats.totalAssets}`}
          color="primary"
        />

        <Chip
          icon={<SecurityIcon />}
          label={`Running : ${stats.runningAssets}`}
          color="success"
        />

        <Chip
          icon={<CheckCircleIcon />}
          label={`Healthy : ${stats.healthyAssets}`}
          color="success"
          variant="outlined"
        />

        <Chip
          icon={<WarningAmberIcon />}
          label={`Warnings : ${stats.warningAssets}`}
          color="warning"
        />
      </Stack>
    </Paper>
  );
}

export default WelcomeBanner;