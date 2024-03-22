package com.example.quantogasta.domain.user;

import java.util.UUID;

public record UserResponseDTO(UUID id, String email, String username) {
    public UserResponseDTO(UserEntity userEntity){
        this(userEntity.getId(), userEntity.getEmail(), userEntity.getUsername());
    }

}
