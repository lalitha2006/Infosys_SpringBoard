package com.sentinelcore.backend.service;

import com.sentinelcore.backend.dto.AuthResponse;
import com.sentinelcore.backend.dto.LoginRequest;
import com.sentinelcore.backend.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

}