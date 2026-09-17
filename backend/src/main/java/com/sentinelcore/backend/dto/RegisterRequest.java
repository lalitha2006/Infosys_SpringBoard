package com.sentinelcore.backend.dto;

import com.sentinelcore.backend.entity.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {

    private String fullName;

    private String username;

    private String email;

    private String password;

    private Role role;

}