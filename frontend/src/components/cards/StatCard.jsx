import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function StatCard({ title, value, icon, color }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: 200,
        borderRadius: 5,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        transition: "0.3s",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: `0 15px 30px ${color}30`,
        },
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Chip
            icon={<TrendingUpIcon />}
            label="+12%"
            size="small"
            color="success"
          />

          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 3,
              bgcolor: `${color}22`,
              color: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "& svg": {
                fontSize: 30,
              },
            }}
          >
            {icon}
          </Box>
        </Box>

        {/* Number */}
        <Typography
          sx={{
            fontSize: 42,
            fontWeight: 700,
            mt: 3,
            lineHeight: 1,
          }}
        >
          {value}
        </Typography>

        {/* Title */}
        <Typography
          sx={{
            mt: 1,
            color: "text.secondary",
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          {title}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* Footer */}
        <Typography
          variant="caption"
          color="text.secondary"
        >
          Updated just now
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;