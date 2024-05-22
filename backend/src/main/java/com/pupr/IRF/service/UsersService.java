package com.pupr.IRF.service;

import com.pupr.IRF.model.UsersModel;
import com.pupr.IRF.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public UsersModel registerUser(String username, String password, String email) {
        if (username == null || password == null) {
            throw new IllegalArgumentException("Username and password must not be null.");
        }

        Optional<UsersModel> existingUser = usersRepository.findByUsername(username);
        if (existingUser.isPresent()) {
            throw new IllegalStateException("User already exists with the username: " + username);
        }

        UsersModel newUser = new UsersModel();
        newUser.setUsername(username);
        newUser.setPassword(password); // Ensure password hashing here
        newUser.setEmail(email);
        return usersRepository.save(newUser);
    }

    public UsersModel authenticate(String username, String password){
        return usersRepository.findByUsernameAndPassword(username, password).orElseThrow(() ->
                new IllegalArgumentException("Invalid username or password."));
    }
}
