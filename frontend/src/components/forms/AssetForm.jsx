import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";

import {
  createAsset,
  updateAsset,
} from "../../services/assetService";

import AppSnackbar from "../common/AppSnackbar";

function AssetForm({
  open,
  handleClose,
  refreshAssets,
  editAsset,
}) {
  const emptyAsset = {
    id: "",
    assetName: "",
    assetType: "",
    ipAddress: "",
    operatingSystem: "",
    location: "",
    status: "Running",
  };

  const [asset, setAsset] = useState(emptyAsset);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (editAsset) {
      setAsset(editAsset);
    } else {
      setAsset(emptyAsset);
    }
  }, [editAsset, open]);

  const handleChange = (e) => {
    setAsset({
      ...asset,
      [e.target.name]: e.target.value,
    });
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleSubmit = async () => {
    if (
      !asset.assetName ||
      !asset.assetType ||
      !asset.ipAddress
    ) {
      showSnackbar(
        "Please fill all required fields.",
        "warning"
      );
      return;
    }

    try {
      if (asset.id) {
        await updateAsset(asset.id, asset);

        showSnackbar(
          "Asset updated successfully.",
          "success"
        );
      } else {
        await createAsset(asset);

        showSnackbar(
          "Asset added successfully.",
          "success"
        );
      }

      refreshAssets();

      setTimeout(() => {
        handleClose();
        setAsset(emptyAsset);
      }, 700);

    } catch (error) {
      console.error(error);

      showSnackbar(
        "Operation failed.",
        "error"
      );
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {asset.id ? "Edit Asset" : "Add New Asset"}
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Asset Name"
                name="assetName"
                value={asset.assetName}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Asset Type"
                name="assetType"
                value={asset.assetType}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="IP Address"
                name="ipAddress"
                value={asset.ipAddress}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Operating System"
                name="operatingSystem"
                value={asset.operatingSystem}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={asset.location}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Status"
                name="status"
                value={asset.status}
                onChange={handleChange}
              >
                <MenuItem value="Running">Running</MenuItem>
                <MenuItem value="Healthy">Healthy</MenuItem>
                <MenuItem value="Warning">Warning</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </TextField>
            </Grid>

          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            {asset.id ? "Update Asset" : "Save Asset"}
          </Button>
        </DialogActions>
      </Dialog>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
      />
    </>
  );
}
export default AssetForm;