package com.resourcifyproject.resourcify;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
@SecondaryTable(name="cart", pkJoinColumns = @PrimaryKeyJoinColumn(name = "userCart_Id"))
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private Role role;
    private String username, password, lastname, firstname;
    private float availablefunds = 0;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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

    public float getAvailablefunds() {
        return availablefunds;
    }

    public void setAvailablefunds(float availablefunds) {
        this.availablefunds = availablefunds;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = Role.valueOf(role);
    }
}