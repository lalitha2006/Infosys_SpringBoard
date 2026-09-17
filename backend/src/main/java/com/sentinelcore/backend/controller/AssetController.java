package com.sentinelcore.backend.controller;

import com.sentinelcore.backend.dto.ApiResponse;
import com.sentinelcore.backend.entity.Asset;
import com.sentinelcore.backend.service.AssetService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
public class AssetController {

    private final AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Asset>>> getAllAssets() {

        List<Asset> assets = assetService.getAllAssets();

        ApiResponse<List<Asset>> response = ApiResponse.<List<Asset>>builder()
                .success(true)
                .message("Assets retrieved successfully")
                .data(assets)
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Asset>> createAsset(@Valid @RequestBody Asset asset) {

        Asset savedAsset = assetService.saveAsset(asset);

        ApiResponse<Asset> response = ApiResponse.<Asset>builder()
                .success(true)
                .message("Asset created successfully")
                .data(savedAsset)
                .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Asset>> getAssetById(@PathVariable Long id) {

        Asset asset = assetService.getAssetById(id);

        ApiResponse<Asset> response = ApiResponse.<Asset>builder()
                .success(true)
                .message("Asset retrieved successfully")
                .data(asset)
                .build();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Asset>> updateAsset(
            @PathVariable Long id,
            @Valid @RequestBody Asset asset) {

        Asset updatedAsset = assetService.updateAsset(id, asset);

        ApiResponse<Asset> response = ApiResponse.<Asset>builder()
                .success(true)
                .message("Asset updated successfully")
                .data(updatedAsset)
                .build();

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteAsset(@PathVariable Long id) {

        assetService.deleteAsset(id);

        ApiResponse<Object> response = ApiResponse.builder()
                .success(true)
                .message("Asset deleted successfully")
                .data(null)
                .build();

        return ResponseEntity.ok(response);
    }
}