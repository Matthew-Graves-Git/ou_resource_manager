package com.resourcifyproject.resourcify;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private Integer id;
    private Role role;
    private String username, password, lastname, firstname;
    private float availableFunds = 0;
    @ElementCollection
    private List<String> cart;

    public Integer getId() {
        return id;
    }   //no setter for ID, it is permanent after being generated

    public List<String> getCart() { return cart; }

    public void setCart(List<String> cart) { this.cart = cart; }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstName) {
        this.firstname = firstname;
    }

    public float getAvailableFunds() {
        return availableFunds;
    }

    public void setAvailableFunds(float availablefunds) {
        this.availableFunds = availablefunds;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = Role.valueOf(role);
    }
}