package com.example.quantogasta.services;

import com.example.quantogasta.domain.monthExpenses.MonthExpenses;
import com.example.quantogasta.domain.user.userDTOs.AuthenticationDTO;
import com.example.quantogasta.domain.user.User;
import com.example.quantogasta.infra.security.TokenService;
import com.example.quantogasta.infra.usersExceptions.EmailAlreadyExistException;
import com.example.quantogasta.infra.usersExceptions.EmailDontExistException;
import com.example.quantogasta.infra.usersExceptions.UserNotFoundException;
import com.example.quantogasta.repositories.UserRepository;
import com.example.quantogasta.domain.user.userDTOs.RegisterDTO;
import com.example.quantogasta.domain.user.userDTOs.UserResponseDTO;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Set;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    public UserResponseDTO findById(UUID id) {
        try {
            UserResponseDTO userResponseDTO = new UserResponseDTO(repository.findById(id).get());

            return userResponseDTO;
        } catch (NoSuchElementException e) {
            throw new UserNotFoundException();
        }

    }

    public String login(AuthenticationDTO data) {
        if (!existsByEmail(data.email())) throw new EmailDontExistException();
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return token;
    }

    public User register(RegisterDTO data) {
        if (existsByEmail(data.email())) throw new EmailAlreadyExistException();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());

        return repository.save(new User(data.email(), encryptedPassword, data.username()));

    }

    public User findByToken(String token) {
        var subject = tokenService.validateToken(token.replace("Bearer ", ""));
        User user = repository.findUserByEmail(subject);

        return user;
    }


    @Transactional
    public User updateUser(RegisterDTO data, UUID id) {
        try {
            User userEntity = repository.getReferenceById(id);
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

    public Set<MonthExpenses> getYearMonthSet(UUID id) {

        User user = repository.findById(id).get();

        return user.getMonthExpensesSet();
    }

    public boolean existsByEmail(String email) {
        return repository.existsByEmailIgnoreCase(email);
    }

    public boolean validateToken(String token){
        String tokenWithoutBearer = token.replace("Bearer ", "");
        try {
            var subject = tokenService.validateToken(tokenWithoutBearer);

            if (subject == "") {
                return false;
            }
            return true ;
        } catch (NullPointerException e) {
            return false;
        }

    }
}