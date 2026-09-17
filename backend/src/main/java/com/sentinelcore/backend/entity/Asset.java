package com.sentinelcore.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "assets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

   @NotBlank(message = "Asset Name is required")
@Column(nullable = false)
private String assetName;

@NotBlank(message = "Asset Type is required")
@Column(nullable = false)
private String assetType;

@NotBlank(message = "IP Address is required")
@Column(nullable = false, unique = true)
private String ipAddress;

    private String operatingSystem;

    private String location;

    private String status;

    @Column(nullable = false, updatable = false)
private LocalDateTime createdAt;

@PrePersist
public void prePersist() {
    this.createdAt = LocalDateTime.now();
}
}