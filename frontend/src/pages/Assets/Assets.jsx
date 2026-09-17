import { useState, useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSearchParams } from "react-router-dom";

import AssetTable from "../../components/common/AssetTable";
import AssetForm from "../../components/forms/AssetForm";

function Assets() {
  const [open, setOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [searchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const value = searchParams.get("search") || "";
    setSearchText(value);
  }, [searchParams]);

  const refreshAssets = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleAdd = () => {
    setSelectedAsset(null);
    setOpen(true);
  };

  const handleEdit = (asset) => {
    setSelectedAsset(asset);
    setOpen(true);
  };

  return (
    <Box sx={{ mt: 4, mb: 4, px: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Asset Management
          </Typography>

          {searchText && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Searching for: <b>{searchText}</b>
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Asset
        </Button>
      </Box>

      <AssetTable
        refreshKey={refreshKey}
        onEdit={handleEdit}
        initialSearch={searchText}
      />

            <AssetForm
        open={open}
        handleClose={() => setOpen(false)}
        refreshAssets={refreshAssets}
        editAsset={selectedAsset}
      />
    </Box>
  );
}

export default Assets;