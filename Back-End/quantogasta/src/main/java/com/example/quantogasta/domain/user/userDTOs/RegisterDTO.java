package com.example.quantogasta.domain.user.userDTOs;


import jakarta.validation.constraints.NotBlank;


public record RegisterDTO(@NotBlank String email, @NotBlank String password, @NotBlank String username) {}
