package com.example.quantogasta.domain.user;


import jakarta.validation.constraints.NotBlank;


public record UserRequestDTO(@NotBlank String email,@NotBlank String password, @NotBlank String username) {}
