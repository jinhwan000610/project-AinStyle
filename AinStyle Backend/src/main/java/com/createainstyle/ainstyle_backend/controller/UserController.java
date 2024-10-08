package com.createainstyle.ainstyle_backend.controller;

import com.createainstyle.ainstyle_backend.model.User;
import com.createainstyle.ainstyle_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        userService.saveUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        Optional<User> user = userService.findByUsername(username);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @GetMapping("/find-id")
    public ResponseEntity<String> findId(@RequestParam String name, @RequestParam String emailOrPhone) {
        Optional<User> user = userService.findByNameAndEmailOrPhoneNumber(name, emailOrPhone, emailOrPhone);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get().getUsername());
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }
}
