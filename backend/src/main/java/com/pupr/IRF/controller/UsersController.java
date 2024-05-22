package com.pupr.IRF.controller;

import com.pupr.IRF.model.UsersModel;
import com.pupr.IRF.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsersController {

    @Autowired
    private UsersService usersService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UsersModel usersModel) {
        try {
            UsersModel registeredUser = usersService.registerUser(usersModel.getUsername(), usersModel.getPassword(), usersModel.getEmail());
            return ResponseEntity.ok(registeredUser);
        } catch (IllegalStateException | IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An internal error occurred while processing your request.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsersModel usersModel) {
        try {
            UsersModel authenticatedUser = usersService.authenticate(usersModel.getUsername(), usersModel.getPassword());
            return ResponseEntity.ok(authenticatedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An internal error occurred during login.");
        }
    }
}
