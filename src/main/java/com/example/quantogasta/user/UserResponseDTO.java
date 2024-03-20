package com.example.quantogasta.user;

import java.time.Instant;
import java.util.UUID;

public record UserResponseDTO(UUID id, String email, String username) {
    public UserResponseDTO(User user){
        this(user.getId(), user.getEmail(), user.getUsername());
    }

}
