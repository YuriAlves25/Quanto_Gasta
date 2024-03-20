package com.example.quantogasta.services;

import com.example.quantogasta.user.User;
import com.example.quantogasta.user.UserRepository;
import com.example.quantogasta.user.UserRequestDTO;
import com.example.quantogasta.user.UserResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    public UserResponseDTO findById(UUID id){
        return  new UserResponseDTO(repository.findById(id).get());
    }

    public User createUser(UserRequestDTO data) {

       return repository.save(new User(null, data.email(), data.password(), data.username()));
    }

    @Transactional
    public User updateUser(UserRequestDTO data, UUID id){
        User user = repository.getReferenceById(id);
        user.setEmail(data.email());
        user.setPassword(data.password());
        user.setUsername(data.username());
        return user;

    }
}
