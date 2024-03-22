package com.example.quantogasta.services;

import com.example.quantogasta.domain.user.UserEntity;
import com.example.quantogasta.infra.usersExceptions.EmailAlreadyExistException;
import com.example.quantogasta.infra.usersExceptions.UserNotFoundException;
import com.example.quantogasta.repositories.UserRepository;
import com.example.quantogasta.domain.user.UserRequestDTO;
import com.example.quantogasta.domain.user.UserResponseDTO;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    public UserResponseDTO findById(UUID id) {
        if(repository.findById(id) == null) {
            UserResponseDTO userResponseDTO = new UserResponseDTO(repository.findById(id).get());

            return userResponseDTO;
        } else {
            throw new UserNotFoundException();
        }

    }

    public UserEntity createUser(UserRequestDTO data) {
        if (!repository.existsByEmailIgnoreCase(data.email())) {

            return repository.save(new UserEntity(null, data.email(), data.password(), data.username()));
        } else {
            throw new EmailAlreadyExistException();
        }
    }

    @Transactional
    public UserEntity updateUser(UserRequestDTO data, UUID id) {
        try {
            UserEntity userEntity = repository.getReferenceById(id);
            if (!repository.existsByEmailIgnoreCase(data.email())) {

                userEntity.setEmail(data.email());
                userEntity.setPassword(data.password());
                userEntity.setUsername(data.username());

                return userEntity;

            } else {
                throw new EmailAlreadyExistException();
            }
        } catch (EntityNotFoundException e) {

            throw new UserNotFoundException();

        }
    }

}