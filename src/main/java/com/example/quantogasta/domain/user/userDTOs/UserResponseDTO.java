package com.example.quantogasta.domain.user.userDTOs;

import com.example.quantogasta.domain.user.User;

import java.util.UUID;

public record UserResponseDTO(UUID id, String email, String username) {
    public UserResponseDTO(User user){
        this(user.getId(), user.getEmail(), user.getUsername());
    }

}
