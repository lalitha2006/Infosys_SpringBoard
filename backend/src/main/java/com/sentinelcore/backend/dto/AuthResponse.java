package com.sentinelcore.backend.dto;

import com.sentinelcore.backend.entity.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private String token;

    private String username;

    private String fullName;

    private Role role;

}