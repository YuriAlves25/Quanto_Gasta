package com.example.quantogasta.config;

import com.example.quantogasta.user.User;
import com.example.quantogasta.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TestConfig implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        User u1 = new User(null, "yuri@hotmail.com", "12345", "yuri alves");

        userRepository.save(u1);
    }
}

