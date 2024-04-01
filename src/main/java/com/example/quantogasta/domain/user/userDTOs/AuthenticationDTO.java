package com.example.quantogasta.domain.user.userDTOs;

import jakarta.validation.constraints.NotBlank;

public record  AuthenticationDTO(@NotBlank String email ,@NotBlank String password) {
}
