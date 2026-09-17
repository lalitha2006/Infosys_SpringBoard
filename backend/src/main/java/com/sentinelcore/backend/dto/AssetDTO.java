package com.sentinelcore.backend.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetDTO {

    private Long id;

    private String assetName;

    private String assetType;

    private String ipAddress;

    private String operatingSystem;

    private String location;

    private String status;

    private LocalDateTime createdAt;
}