package com.sentinelcore.backend.service;

import com.sentinelcore.backend.dto.AssetDTO;
import com.sentinelcore.backend.entity.Asset;
import com.sentinelcore.backend.exception.ResourceNotFoundException;
import com.sentinelcore.backend.mapper.AssetMapper;
import com.sentinelcore.backend.repository.AssetRepository;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class AssetService {

    private static final Logger logger = LoggerFactory.getLogger(AssetService.class);

    private final AssetRepository assetRepository;
    private final AssetMapper assetMapper;

    public AssetService(AssetRepository assetRepository, AssetMapper assetMapper) {
        this.assetRepository = assetRepository;
        this.assetMapper = assetMapper;
    }

    public List<Asset> getAllAssets() {
        logger.info("Fetching all assets");
return assetRepository.findAll();
    }

    public Asset saveAsset(Asset asset) {
       logger.info("Creating asset: {}", asset.getAssetName());
return assetRepository.save(asset);
    }

    public Asset getAssetById(Long id) {

    logger.info("Fetching asset with ID: {}", id);

    return assetRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Asset not found with id: " + id));
}

    public Asset updateAsset(Long id, Asset updatedAsset) {

        Asset asset = assetRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Asset not found with id: " + id));

        asset.setAssetName(updatedAsset.getAssetName());
        asset.setAssetType(updatedAsset.getAssetType());
        asset.setIpAddress(updatedAsset.getIpAddress());
        asset.setOperatingSystem(updatedAsset.getOperatingSystem());
        asset.setLocation(updatedAsset.getLocation());
        asset.setStatus(updatedAsset.getStatus());

        return assetRepository.save(asset);
    }

   public void deleteAsset(Long id) {

    logger.info("Deleting asset with ID: {}", id);

    assetRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Asset not found with id: " + id));

    assetRepository.deleteById(id);
}

    public AssetDTO convertToDTO(Asset asset) {
        return assetMapper.toDTO(asset);
    }

    public Asset convertToEntity(AssetDTO dto) {
        return assetMapper.toEntity(dto);
    }
}
