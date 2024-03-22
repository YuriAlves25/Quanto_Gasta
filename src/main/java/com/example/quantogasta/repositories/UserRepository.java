package com.example.quantogasta.repositories;

import com.example.quantogasta.domain.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    boolean existsByEmailIgnoreCase(String email);

}
