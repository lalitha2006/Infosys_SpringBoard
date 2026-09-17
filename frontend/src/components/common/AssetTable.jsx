import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import { Edit, Delete } from "@mui/icons-material";

import {
  getAllAssets,
  deleteAsset,
} from "../../services/assetService";

import AppSnackbar from "../common/AppSnackbar";

function AssetTable({
  refreshKey,
  onEdit,
  initialSearch = "",
}) {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [search, setSearch] = useState(initialSearch);

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success",
});

useEffect(() => {
  setSearch(initialSearch);
}, [initialSearch]);

useEffect(() => {
  loadAssets();
}, [refreshKey, initialSearch]);

  const loadAssets = async () => {
    try {
      const data = await getAllAssets();
      setAssets(data);

if (initialSearch) {
  const filtered = data.filter(
    (asset) =>
      asset.assetName
        .toLowerCase()
        .includes(initialSearch.toLowerCase()) ||
      asset.assetType
        .toLowerCase()
        .includes(initialSearch.toLowerCase()) ||
      asset.ipAddress
        .toLowerCase()
        .includes(initialSearch.toLowerCase())
  );

  setFilteredAssets(filtered);
} else {
  setFilteredAssets(data);
}
    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        message: "Failed to load assets.",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    const filtered = assets.filter(
      (asset) =>
        asset.assetName.toLowerCase().includes(search.toLowerCase()) ||
        asset.assetType.toLowerCase().includes(search.toLowerCase()) ||
        asset.ipAddress.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredAssets(filtered);
  }, [search, assets]);

  const getStatusColor = (status) => {
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

  const confirmDelete = (id) => {
    setSelectedId(id);
    setDeleteDialog(true);
  };

  const handleDelete = async () => {
    try {
      await deleteAsset(selectedId);

      setDeleteDialog(false);

      setSnackbar({
        open: true,
        message: "Asset deleted successfully.",
        severity: "success",
      });

      loadAssets();
    } catch (error) {
      console.error(error);

      setDeleteDialog(false);

      setSnackbar({
        open: true,
        message: "Failed to delete asset.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Paper sx={{ p: 3, borderRadius: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Assets
          </Typography>

          <TextField
  label="Search Assets"
  size="small"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  sx={{
    width: 300,
  }}
/>
        </Box>

        <TableContainer
  sx={{
    maxHeight: 600,
  }}
>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Type</b></TableCell>
                <TableCell><b>IP Address</b></TableCell>
                <TableCell><b>Operating System</b></TableCell>
                <TableCell><b>Location</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell align="center"><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredAssets.map((asset) => (
                <TableRow key={asset.id} hover>
                  <TableCell>{asset.assetName}</TableCell>
                  <TableCell>{asset.assetType}</TableCell>
                  <TableCell>{asset.ipAddress}</TableCell>
                  <TableCell>{asset.operatingSystem}</TableCell>
                  <TableCell>{asset.location}</TableCell>

                  <TableCell>
                    <Chip
  label={asset.status}
  color={getStatusColor(asset.status)}
  size="small"
  sx={{
    fontWeight: "bold",
    minWidth: 90,
  }}
/>
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
  color="primary"
  size="small"
  onClick={() => onEdit(asset)}
>
                      <Edit />
                    </IconButton>

                    <IconButton
  color="error"
  size="small"
  onClick={() => confirmDelete(asset.id)}
>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </Paper>

      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
      >
        <DialogTitle>Delete Asset</DialogTitle>

        <DialogContent>
          Are you sure you want to delete this asset?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
          >
            Delete
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

export default AssetTable;