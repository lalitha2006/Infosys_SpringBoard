import { Box, Typography } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";

function Logo() {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <SecurityIcon
        sx={{
          color: "#00C853",
          fontSize: 34,
        }}
      />

      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          letterSpacing: 1,
          background: "linear-gradient(90deg,#00C853,#1976D2)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        SentinelCore
      </Typography>
    </Box>
  );
}

export default Logo;