package com.createainstyle.ainstyle_backend.service;

import com.createainstyle.ainstyle_backend.model.User;
import com.createainstyle.ainstyle_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findByNameAndEmailOrPhoneNumber(String name, String email, String phoneNumber) {
        return userRepository.findByNameAndEmailOrPhoneNumber(name, email, phoneNumber);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
