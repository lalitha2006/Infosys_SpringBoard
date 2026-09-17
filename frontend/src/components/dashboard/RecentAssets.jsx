import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Avatar,
  Box,
  Chip,
  Divider,
} from "@mui/material";

import ComputerIcon from "@mui/icons-material/Computer";

import { getAllAssets } from "../../services/assetService";

function RecentAssets() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      const data = await getAllAssets();

      setAssets(
        [...data]
          .sort((a, b) => b.id - a.id)
          .slice(0, 5)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getColor = (status) => {
    switch (status?.toLowerCase()) {
      case "running":
      case "healthy":
        return "success";

      case "warning":
        return "warning";

      case "critical":
        return "error";

      default:
        return "default";
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 5,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        mb={2}
      >
        Recently Added Assets
      </Typography>

      {assets.map((asset, index) => (
        <Box key={asset.id}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={2}
          >
            <Box
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 48,
                  height: 48,
                }}
              >
                <ComputerIcon />
              </Avatar>

              <Box>
                <Typography fontWeight={700}>
                  {asset.assetName}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {asset.assetType}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {asset.ipAddress}
                </Typography>
              </Box>
            </Box>

            <Chip
              label={asset.status}
              color={getColor(asset.status)}
              size="small"
            />
          </Box>

          {index !== assets.length - 1 && <Divider />}
        </Box>
      ))}
    </Paper>
  );
}

export default RecentAssets;