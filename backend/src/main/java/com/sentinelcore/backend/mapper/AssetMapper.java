package com.sentinelcore.backend.mapper;

import com.sentinelcore.backend.dto.AssetDTO;
import com.sentinelcore.backend.entity.Asset;
import org.springframework.stereotype.Component;

@Component
public class AssetMapper {

    public AssetDTO toDTO(Asset asset) {

        return AssetDTO.builder()
                .id(asset.getId())
                .assetName(asset.getAssetName())
                .assetType(asset.getAssetType())
                .ipAddress(asset.getIpAddress())
                .operatingSystem(asset.getOperatingSystem())
                .location(asset.getLocation())
                .status(asset.getStatus())
                .createdAt(asset.getCreatedAt())
                .build();
    }

    public Asset toEntity(AssetDTO dto) {

        return Asset.builder()
                .id(dto.getId())
                .assetName(dto.getAssetName())
                .assetType(dto.getAssetType())
                .ipAddress(dto.getIpAddress())
                .operatingSystem(dto.getOperatingSystem())
                .location(dto.getLocation())
                .status(dto.getStatus())
                .createdAt(dto.getCreatedAt())
                .build();
    }
}